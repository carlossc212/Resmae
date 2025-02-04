import { PDFDocument, PDFFont, PDFPage, PDFPageDrawTextOptions, RGB, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";

export async function generateInvoice(filename: string) {
    const pdf = await PDF.create(filename);
   

    pdf.save();
}

type Row<T extends string[]> = { [K in keyof T]: string };
interface TableOptions<T extends string[]> {
    borderColor: RGB;
    borderWidth: number;
    headers: T;
    fields: Row<T>[];
    cellPadding: number;
}

class PDF{
    private output: string;
    private padding = 50;
    private width = 595;
    private height = 842;
    private pdfDoc: PDFDocument;
    private page: PDFPage;
    private x = this.padding;
    private y = this.height - this.padding;
    private lineHeight = 14;

    static async create(output = "myPdf.pdf"){
        return new PDF(await PDFDocument.create(), output);
    }

    private constructor(doc: PDFDocument, output: string) {
        this.output = output;
        this.pdfDoc = doc;
        this.page = this.pdfDoc.addPage([this.width, this.height]); // Tamaño A4
    }

    private addPage(){
        this.page = this.pdfDoc.addPage([this.width, this.height]);
        this.y = this.height - this.padding;
    }

    writeLine(text: string, options: PDFPageDrawTextOptions = {
        x: this.x,
        y: this.y,
        size: 10,  
        color: rgb(0, 0, 0) ,
        maxWidth: this.width - (this.padding * 2),
        wordBreaks:  Array.from(new Set(text.split(""))),
        lineHeight: this.lineHeight,
    }) {
        if((this.y - options.lineHeight) < this.padding) {
            this.addPage();
        }

        const textFont = options.font ? options.font : this.pdfDoc.embedStandardFont(StandardFonts.Helvetica);

        const printedHeight = this.printText(text, textFont, options.size, options.x, options.y, options.maxWidth);

        this.y -= printedHeight;
    }

    drawTable(options: TableOptions<string[]>) {
        const font = this.pdfDoc.embedStandardFont(StandardFonts.Helvetica);
        const columnWidth = (this.width - this.padding*2)/(options.headers.length);
        const usableColumnWidth = columnWidth - (options.cellPadding * 2);
        const higherHeaderRow = Math.max(...options.headers.map(text => this.getHeightWhenPrinted(text, font, 10, usableColumnWidth)));

        //Print The headers
        for (let i = 0; i < options.headers.length; i++) {
            const headerCellHeight = this.getHeightWhenPrinted(options.headers[i], font, 10, usableColumnWidth);
            this.printText(
                options.headers[i], 
                font, 10, 
                this.x + options.cellPadding + (i*columnWidth), 
                this.y - options.cellPadding - (higherHeaderRow - headerCellHeight)/2 - this.lineHeight/2, 
                usableColumnWidth,
                "center"
            );
            this.page.drawRectangle({
                borderColor: options.borderColor,
                height: higherHeaderRow + options.cellPadding*2,
                borderWidth:  options.borderWidth,
                width: columnWidth,
                x: this.x + (i*columnWidth),
                y: this.y - (higherHeaderRow) - options.cellPadding-(this.lineHeight -10)/2
            });
        }
        this.y -= higherHeaderRow+options.cellPadding*2;

        for (let i = 0; i < options.fields.length; i++) {
            const higherFieldRow = Math.max(...options.fields[i].map(text => this.getHeightWhenPrinted(text, font, 10, usableColumnWidth)));
            for (let j = 0; j < options.fields[i].length; j++) {
                const fieldCellHeight = this.getHeightWhenPrinted(options.fields[i][j], font, 10, usableColumnWidth);
                this.printText(
                    options.fields[i][j], 
                    font, 10, 
                    this.x + options.cellPadding + (j*columnWidth), 
                    this.y - options.cellPadding - (higherFieldRow - fieldCellHeight)/2 - this.lineHeight/2, 
                    usableColumnWidth,
                    "center"
                );
                this.page.drawRectangle({
                    borderColor: options.borderColor,
                    height: higherFieldRow + options.cellPadding*2,
                    borderWidth:  options.borderWidth,
                    width: columnWidth,
                    x: this.x + (j*columnWidth),
                    y: this.y - (higherFieldRow) - options.cellPadding-(this.lineHeight -10)/2
                });
            }
            this.y -= higherFieldRow+options.cellPadding*2;
        }

    }

    private wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number) {
        const lines: string[] = [];
        const words = text.split(" ");
        let currentLine = "";

        for (const word of words) {
            if(font.widthOfTextAtSize(`${currentLine} ${word}`, fontSize) <= maxWidth){
                currentLine = [currentLine, word].join(' ').trim();
            }else if(font.widthOfTextAtSize(word, fontSize) > maxWidth){                
                currentLine += ' ';
                for (const char of word) {
                    const testLine = currentLine + char;
                    const textWidth = font.widthOfTextAtSize(testLine, fontSize);
            
                    if (textWidth > maxWidth && currentLine.length > 0) {
                        lines.push(currentLine);
                        currentLine = char;
                    } else {
                        currentLine = testLine;
                    }
                }
            }else{
                lines.push(currentLine);
                currentLine = word;
            }
        }
        
        if (currentLine.trim() != '') lines.push(currentLine);
        
        return lines;
    }

    private getHeightWhenPrinted(text: string, font: PDFFont, fontSize: number, maxWidth: number){
        const lines = this.wrapText(text, font, fontSize, maxWidth);
        return lines.length * this.lineHeight;
    }

    private printText(text: string, font: PDFFont, fontSize: number, x: number, y: number, maxWidth: number, alignment: "left"|"center"|"right" = "left") {
        const lines = this.wrapText(text, font, fontSize, maxWidth);
        let plusX = 0;
        

        for (let i = 0; i < lines.length; i++) {
            if((this.y - this.lineHeight) < this.padding) {
                this.addPage();
            }
            if(alignment === "left"){
                plusX = 0;
            }else if(alignment === "center"){
                plusX = (maxWidth - this.getTextWidth(lines[i], font, fontSize))/2;
            }else if(alignment === "right"){
                plusX = maxWidth - this.getTextWidth(lines[i], font, fontSize);
            }
            this.page.drawText(lines[i], {
                size: fontSize,
                x: x + plusX,
                y: y - (i * this.lineHeight),
                maxWidth: maxWidth,
                lineHeight: this.lineHeight,
            })
        }

        return lines.length * this.lineHeight;
    }

    //Used just for counting the number of lines wrapped when writing a line
    private countWrappedLines(text: string, font: PDFFont, fontSize: number, maxWidth: number) {
        let lines = 0;
        let currentLine = "";
    
        for (const char of text) {
            const testLine = currentLine + char;
            const textWidth = font.widthOfTextAtSize(testLine, fontSize);
    
            if (textWidth > maxWidth && currentLine.length > 0) {
                lines++;
                currentLine = char;
            } else {
                currentLine = testLine;
            }
        }
    
        if (currentLine) lines++;
    
        return lines;
    }

    private getTextWidth(text: string, font: PDFFont, fontSize: number) {
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        return textWidth;
    }

    async save(){
        const pdfBytes = await this.pdfDoc.save();
        fs.writeFileSync(this.output, pdfBytes);
    }
}