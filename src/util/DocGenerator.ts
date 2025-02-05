import { PDFDocument, PDFFont, PDFPage, PDFPageDrawTextOptions, RGB, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";

export async function generateInvoice(filename: string) {
    const pdf = await PDF.create(filename);
    const fontBold = await pdf.getStandardFont(StandardFonts.HelveticaBold);
    pdf.drawTable({
        headers: [PDFText.emptyText(), PDFText.emptyText(), PDFText.emptyText()],
        fields: [
            [
                new PDFText("Ejemplo S.A.", "left", "top", fontBold, 16, 24),
                new PDFText("Direccion:\nTelefono:\nCIF:\nE-mail:\nPagina Web", "left", "top", fontBold), 
                new PDFText("Calle Falsa 123, Ciudad, País\n+34 600 123 456\nB12345678\ninfo@ejemplosa.com\nwww.ejemplosa.com", "right")
            ], 
        ],
        cellPadding: 0,
        borderColor: rgb(0, 0, 0),
        headerColor: rgb(0.156, 0.156, 0.156),
        borderWidth: 0,
        borderOpacity: 0,
        columnGrowth: [6, 2, 4]
    });
    pdf.drawLine(19);
    pdf.drawTable({
        headers: [PDFText.emptyText(), PDFText.emptyText(), PDFText.emptyText(), PDFText.emptyText()],
        fields: [
            [
                new PDFText("Factura a:", "left", "top", fontBold),
                new PDFText("Juan Pérez\nAvenida Principal 456, Piso 2\nCiudad, País\nTeléfono: +34 700 987 654", "left", "top"), 
                new PDFText("Factura N.º:\nFecha de Emisión:\nFecha de vencimiento:", "left", "top", fontBold),
                new PDFText("2025-001\n26/01/2025\n10/02/2025", "right", "top"),
            ], 
        ],
        cellPadding: 0,
        borderColor: rgb(0, 0, 0),
        headerColor: rgb(0.156, 0.156, 0.156),
        borderWidth: 0,
        borderOpacity: 0,
        columnGrowth: [2, 8, 4, 3]
    });

    pdf.drawSpace(20);

    pdf.drawTable({
        headers:[
            new PDFText("Descripción", "center", "top", fontBold), 
            new PDFText("Cantdad", "center", "top", fontBold),
            new PDFText("Precio Unitario", "center", "top", fontBold),
            new PDFText("IVA", "center", "top", fontBold),
            new PDFText("Total", "center", "top", fontBold)
        ],
        fields: [
            [
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ],[
                new PDFText("Consultoria en Tecnologia", "center", "middle"),
                new PDFText("1", "center", "middle"), 
                new PDFText("750.00", "center", "middle"),
                new PDFText("21%", "center", "middle"),
                new PDFText("907.50", "center", "middle"),
            ]
        ],
        cellPadding: 1.5,
        borderColor: rgb(0, 0, 0),
        borderWidth: 0.4,
        borderOpacity: 1,
        headerColor: rgb(0.66, 0.66, 0.66),
        columnGrowth: [3, 1, 2, 1, 2]
    });
    pdf.drawSpace(20);
    pdf.drawTable({
        headers: [PDFText.emptyText(), PDFText.emptyText(), PDFText.emptyText()],
        fields: [
            [
                PDFText.emptyText(),
                new PDFText("Subtotal sin IVA\nIVA 21%\nTotal", "left", "top"),
                new PDFText("1.000,00\n210,00\n1.210,00", "right", "top")
            ]
        ],
        cellPadding: 0,
        borderColor: rgb(0, 0, 0),
        borderWidth: 0,
        borderOpacity: 0,
        headerColor: rgb(1, 1, 1),
        columnGrowth: [3, 2, 1]
    });
    pdf.save();
}

class PDFText {
    text: string;
    alignment: "left"|"center"|"right";
    verticalAlignment: "top"|"middle"|"bottom";
    font?: PDFFont;
    fontSize: number;
    lineHeight: number;
    constructor(text: string, alignment: "left"|"center"|"right" = "left", verticalAlignment: "top"|"middle"|"bottom" = "middle",font?: PDFFont, fontSize = 10, lineHeight = 14){
        this.text = text;
        this.alignment = alignment;
        this.verticalAlignment = verticalAlignment;
        this.font = font;
        this.fontSize = fontSize;
        this.lineHeight = lineHeight;
    }

    public static emptyText(){
        return new PDFText("");
    }
}
interface TableOptions {
    borderColor: RGB;
    borderWidth: number;
    borderOpacity: number;
    headerColor: RGB;
    headers: PDFText[];
    fields: PDFText[][];
    cellPadding: number;
    columnGrowth: number[];
}

class PDF{
    private output: string;
    private padding = 40;
    private width = 595;
    private height = 842;
    private pdfDoc: PDFDocument;
    private page: PDFPage;
    private x = this.padding;
    private y = this.height - this.padding;
    private lineHeight = 14;
    private fontSize = 10;

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

    setFontSize(size: number){
        this.fontSize = size;
    }

    drawSpace(size: number){
        this.y -= size;
    }
    writeLine(text: PDFText, opts: PDFPageDrawTextOptions = {}) {
        const options: PDFPageDrawTextOptions ={
            x: this.x,
            y: this.y,
            size: this.fontSize,  
            color: rgb(0, 0, 0) ,
            maxWidth: this.width - (this.padding * 2),
            wordBreaks:  Array.from(new Set(text.text.split(""))),
            lineHeight: text.lineHeight ?? this.lineHeight,
            font: text.font,
            ...opts
        }

        if((this.y - options.lineHeight) < this.padding) {
            this.addPage();
        }

        const textFont = options.font ? options.font : this.pdfDoc.embedStandardFont(StandardFonts.Helvetica);

        const printedHeight = this.printText(text, textFont, options.size, options.x, options.y, options.maxWidth, text.alignment);

        this.y -= printedHeight;
    }

    drawTable(options: TableOptions) {
        const font = this.pdfDoc.embedStandardFont(StandardFonts.Helvetica);
        const columnWidth = (this.width - this.padding*2)/(options.headers.length);
        const columnWidths = options.columnGrowth.map(growth => {
            const total = options.columnGrowth.reduce((a, b) => a + b, 0);
            
            return (columnWidth*options.headers.length)*(growth/total);
        });
        const usableColumnWidth = (index: number) => columnWidths[index] - (options.cellPadding * 2);
        const higherHeaderRow = Math.max(...options.headers.map((text, index) => this.getHeightWhenPrinted(text, font, this.fontSize, usableColumnWidth(index))));        
        const widthAtColumn = (index: number)=>{
            let width = 0;
            for (let i = 0; i < index; i++) {
                width += columnWidths[i];
            }
            return width;
        }

        //Print The headers
        for (let i = 0; i < options.headers.length; i++) {
            const headerCellHeight = this.getHeightWhenPrinted(options.headers[i], font, this.fontSize, usableColumnWidth(i));
            if((this.y - headerCellHeight) < this.padding) {
                this.addPage();
            } 
            let plusY = (options.headers[i].lineHeight ?? this.lineHeight)/2 +((options.headers[i].lineHeight ?? this.lineHeight)-(options.headers[i].fontSize ?? this.fontSize)) + options.cellPadding;

                if(options.headers[i].verticalAlignment === "middle"){
                    plusY += (higherHeaderRow - headerCellHeight)/2;
                }else if(options.headers[i].verticalAlignment === "bottom"){
                    plusY +=(higherHeaderRow - headerCellHeight);
                }
            this.page.drawRectangle({
                borderColor: options.borderColor,
                height: higherHeaderRow + options.cellPadding*2,
                borderWidth:  options.borderWidth,
                borderOpacity: options.borderOpacity,
                color: options.headerColor,
                width: columnWidths[i],
                x: this.x + widthAtColumn(i),
                y: this.y - (higherHeaderRow) - options.cellPadding-((options.headers[i].lineHeight ?? this.lineHeight) -(options.headers[i].fontSize ?? this.fontSize))/2
            });
            this.printText(
                options.headers[i], 
                options.headers[i].font ?? font, 
                options.headers[i].fontSize ?? this.fontSize, 
                this.x + options.cellPadding + widthAtColumn(i), 
                this.y - plusY, 
                usableColumnWidth(i),
                options.headers[i].alignment
            );
            
        }
        this.y -= higherHeaderRow+options.cellPadding*2;

        for (let i = 0; i < options.fields.length; i++) {
            const higherFieldRow = Math.max(...options.fields[i].map((text, index) => this.getHeightWhenPrinted(text, font, this.fontSize, usableColumnWidth(index))));
            for (let j = 0; j < options.fields[i].length; j++) {
                const fieldCellHeight = this.getHeightWhenPrinted(options.fields[i][j], font, (options.fields[i][j].fontSize ?? this.fontSize), usableColumnWidth(j));
                if((this.y - fieldCellHeight) < this.padding) {
                    this.addPage();  
                    this.drawTable({...options, fields: []})          
                }                
                
                let plusY = (options.fields[i][j].lineHeight ?? this.lineHeight)/2 +((options.fields[i][j].lineHeight ?? this.lineHeight)-(options.fields[i][j].fontSize ?? this.fontSize)) + options.cellPadding;

                if(options.fields[i][j].verticalAlignment === "middle"){
                    plusY += (higherFieldRow - fieldCellHeight)/2;
                }else if(options.fields[i][j].verticalAlignment === "bottom"){
                    plusY +=(higherFieldRow - fieldCellHeight);
                }
                this.printText(
                    options.fields[i][j], 
                    options.fields[i][j].font ?? font, 
                    options.fields[i][j].fontSize ?? this.fontSize, 
                    this.x + options.cellPadding + widthAtColumn(j), 
                    this.y - plusY, 
                    usableColumnWidth(j),
                    options.fields[i][j].alignment
                );
                this.page.drawRectangle({
                    borderColor: options.borderColor,
                    height: higherFieldRow + options.cellPadding*2,
                    borderWidth:  options.borderWidth,
                    borderOpacity: options.borderOpacity,
                    width: columnWidths[j],
                    x: this.x + widthAtColumn(j),
                    y: this.y - (higherFieldRow) - options.cellPadding-((options.fields[i][j].lineHeight ?? this.lineHeight) - (options.fields[i][j].fontSize ?? this.fontSize))/2
                });
            }
            this.y -= higherFieldRow+options.cellPadding*2;
        }

    }

    drawLine(margin = 0){
        this.page.drawLine({
            color: rgb(0, 0, 0),
            opacity: 1,
            start: { x: this.x, y: this.y - margin },
            end: { x: this.x + this.width - this.padding*2, y: this.y - margin },
            thickness: 1
        });

        this.y -= (margin+this.lineHeight)*2;
    }

    private wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number) {
        const lines: string[] = [];
        const words = text.split(" ");
        let currentLine = "";

        for (const word of words) {
            if(font.widthOfTextAtSize(`${currentLine} ${word}`, fontSize) <= maxWidth){
                currentLine = [currentLine, word].join(' ').trim();
            }else if(font.widthOfTextAtSize(word, fontSize) > maxWidth){                
                if (currentLine.trim() != "") currentLine += " ";
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

    private getHeightWhenPrinted(text: PDFText, font: PDFFont, fontSize: number, maxWidth: number){
        const lines: string[] = [];
        const brekLines = text.text.split("\n");
        
        
        for (const breakLine of brekLines) {
            lines.push(...this.wrapText(breakLine, font, fontSize, maxWidth));
        }
        return lines.length * (text.lineHeight ?? this.lineHeight);
    }

    private printText(text: PDFText, font: PDFFont, fontSize: number, x: number, y: number, maxWidth: number, alignment: "left"|"center"|"right" = "left") {
        const lines: string[] = [];
        const brekLines = text.text.split("\n");
        for (const breakLine of brekLines) {
            lines.push(...this.wrapText(breakLine, font, fontSize, maxWidth));
        }
        let plusX = 0;
        

        for (let i = 0; i < lines.length; i++) {
            if((this.y - (text.lineHeight ?? this.lineHeight)) < this.padding) {
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
                y: y - (i * (text.lineHeight ?? this.lineHeight)),
                maxWidth: maxWidth,
                lineHeight: (text.lineHeight ?? this.lineHeight),
                font: font
            })
        }

        return lines.length * (text.lineHeight ?? this.lineHeight);
    }

    public async getStandardFont(font: StandardFonts){
        return this.pdfDoc.embedFont(font);
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