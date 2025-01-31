import { PDFDocument, PDFFont, PDFPage, PDFPageDrawTextOptions, RGB, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";

export async function generateInvoice(filename: string) {
    const pdf = await PDF.create(filename);
    pdf.writeLine("Ejemplo S.A.");
    pdf.writeLine("Ejemplo S.A.kjfbsdfjkfgbskhfbdshfbasdhfsadjfbdfjbfjhsavjsfvasiyhfgasksjbfkhsdbvciysabfhsbfvyisdvfhisavbfhsadfvhjasvfhasbvfkhasfvbkhldsbfvadhsfbvhklasdfvadsvfkadhsvfadsvfjhasvfasvdfhjdsavfasdvfhjvfayisfdvyasdgfvfbasdjfvasdfghvasfbvsafj");

    pdf.drawTable({
        borderColor: rgb(0, 0, 0),
        borderWidth: 0.6,
        headers: ["Item", "Description", "Price", "Quantity"],
        fields: [
            ["Item 1", "Description 1", "10", "1"],
            ["Item 2", "Description 2", "20", "2"],
            ["Item 3", "Description 3", "30", "3"],
        ],
        cellPadding: 4
    });

    pdf.drawTable({
        borderColor: rgb(0, 0, 0),
        borderWidth: 0.6,
        headers: ["Item", "Description", "Price", "Quantity"],
        fields: [
            ["Item 1", "Description 1", "10", "1"],
            ["Item 2", "Description 2", "20", "2"],
            ["Item 3", "Description 3", "30", "3"],
        ],
        cellPadding: 4
    });

    pdf.drawTable({
        borderColor: rgb(0, 0, 0),
        borderWidth: 0.6,
        headers: ["Item", "Description", "Price", "Quantity"],
        fields: [
            ["Item 1", "Description 1", "10", "1"],
            ["Item 2", "Description 2", "20", "2"],
            ["Item 3", "Description 3", "30", "3"],
        ],
        cellPadding: 4
    });
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

        const lines = this.countWrappedLines(text, textFont, options.size, options.maxWidth);
        this.page.drawText(text, {...options});

        this.y -= (options.lineHeight * lines);
    }

    drawTable(options: TableOptions<string[]>) {
        const cellTotalHeight = 10 + options.cellPadding*2;
        this.y -= (this.lineHeight + cellTotalHeight);
        const font = this.pdfDoc.embedStandardFont(StandardFonts.Helvetica);
        const columns = options.headers.length;
        const columnWidth = (this.width- (this.padding * 2)) / columns;

        for (let i = 0; i < columns; i++) {
            this.page.drawRectangle({
                borderColor: options.borderColor,
                borderWidth: options.borderWidth,
                x: this.x +(columnWidth * i),
                y: this.y,
                width: columnWidth ,
                height: cellTotalHeight,
            });
            const [textHeight, textWidth] = this.getTextHeightWidth(options.headers[i], font, 10);
            
            this.page.drawText(options.headers[i], {
                size: 10,
                x: this.x+(columnWidth*i) + ((columnWidth - textWidth)/2), 
                y: this.y+options.cellPadding+(this.lineHeight - textHeight)/2,
            })
        }
        this.y -= (cellTotalHeight);

        for (let i = 0; i < options.fields.length; i++) {
            for (let j = 0; j < options.fields[i].length; j++) {
                this.page.drawRectangle({
                    borderColor: options.borderColor,
                    borderWidth: options.borderWidth,
                    x: this.x +(columnWidth * j),
                    y: this.y,
                    width: columnWidth ,
                    height: cellTotalHeight,
                });

                const [textHeight, textWidth] = this.getTextHeightWidth(options.fields[i][j], font, 10);

                this.page.drawText(options.fields[i][j], {
                    size: 10,
                    x: this.x+(columnWidth*j) + ((columnWidth - textWidth)/2), 
                    y: this.y+options.cellPadding+(this.lineHeight - textHeight)/2,
                })
            }
            this.y -= (cellTotalHeight);
        }

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

    private getTextHeightWidth(text: string, font: PDFFont, fontSize: number) {
        const textHeight = font.heightAtSize(fontSize);
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        return [textHeight, textWidth];
    }

    async save(){
        const pdfBytes = await this.pdfDoc.save();
        fs.writeFileSync(this.output, pdfBytes);
    }
}