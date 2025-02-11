type Choice<A, B> = A | B;

type ContactDetails = {
    telephone?: string;
    teleFax?: string;
    webAddress?: string;
    electronicMail?: string;
    contactPersons?: string;
    cnoCnae?: string;
    INETTownCode?: string;
    additionalContactDetails?: string;
};

type TaxIdentification = {
    personTypeCode: "F" | "J";
    residenceTypeCode: "E" | "R" | "U";
    taxIdentificationNumber: string;
};

type LegalEntity = {
    corporateName: string;
    tradeName?: string;
    registrationData?: {
        book?: string;
        registerOfCompaniesLocation?: string;
        sheet?: string;
        folio?: string;
        section?: string;
        volume?: string;
        additionalRegistrationData?: string;
    }
    address: Choice<AddressInSpain,  OverseasAddress>;
    contactDetails?: ContactDetails;
}

type Individual = {
    name: string;
    firstSurname: string;
    secondSurname?: string;
    address: Choice<AddressInSpain, OverseasAddress>;
    contactDetails?: ContactDetails;
}

type AddressInSpain = {
    address: string;
    postCode: string;
    town: string;
    province: string;
    countryCode: string;
}

type OverseasAddress = {
    address: string;
    postCodeAndTown: string;
    province: string;
    countryCode: string;
}

type ThirdParty = {
    taxIdentification: TaxIdentification;
    entity: Choice<LegalEntity, Individual>;
};

type Amount = {
    totalAmount: string;
    equivalentInEuros?: string;
};

type Batch = {
    batchIdentifier: string;
    invoicesCount: string;
    totalInvoicesAmount: Amount;
    totalOutstandingAmount: Amount;
    totalExecutableAmount: Amount;
    invoiceCurrencyCode: string;
}

type Assignee = { 
    taxIdentification: TaxIdentification;
    entity: Choice<LegalEntity, Individual>;
};

type IBAN = string;

type AccountNumber = string;

type Account = {
    id: Choice<IBAN, AccountNumber>;
    bankCode: string;
    branchCode: string;
    branchAddress: Choice<AddressInSpain, OverseasAddress>;
    BIC: string;
};

type Installment = {
    installmentDueDate: string;
    installmentAmount: string;
    paymentMeans: string;
    accountToBeCredited?: Account;
    paymentReconciliationReference?: string;
    accountToBeDebited?: Account;
    collectionAdditionalInformation?: string;
    regulatoryReportingData?: string;
    debitReconciliationReference?: string;
};

type PaymentDetails = {
    installment: Installment[];
};

type Repository = {
    repositoryName: "CGN" | "ROLECE" | "REA" | "otros";
    url?: string;
    reference: string;
}

type FactoringAssignmentDocument = {
    documentCharacter: string;
    representationIdentity?: string;
    documentType: "escritura pública" | "documento privado";
    repository?: Repository;
}

type FactoryAssignmentData = {
    assignee: Assignee;
    paymentDetails: PaymentDetails;
    factoryAssignmentClauses: string;
    factoryAssignmentDocument?: FactoringAssignmentDocument[];
};

interface FileHeader {
    schemaVersion: "3.2" | "3.2.1" | "3.2.2";
    modality: "I" | "L";
    invoiceIssuerType: "EM"|"RE"| "TE";
    thirdParty?: ThirdParty;
    batch: Batch;
    factoryAssignmentData?: FactoryAssignmentData;
}

type AdministrativeCentre = {
    centreCode?: string;
    roleTypeCode?: string;
    name?: string;
    firstSurname?: string;
    secondSurname?: string;
    address: Choice<AddressInSpain, OverseasAddress>;
    contactDetails?: ContactDetails;
    physicalGLN?: string;
    logicalOperationalPoint?: string;
    centreDescription?: string;
}

type Party = {
    taxIdentification?: TaxIdentification;
    partyIdentification: string;
    administrativeCentres?: AdministrativeCentre[];
    entity: Choice<LegalEntity, Individual>;
};

interface Parties {
    sellerParty: Party;
    buyerParty: Party;
}

type Period = {
    startDate: string;
    endDate: string;
};

type Corrective = {
    invoiceNumber?: string;
    invoiceSeriesCode?: string;
    reasonCode: string;
    reasonDescription: string;
    taxPeriod: Period;
    correctionMethod: "01" | "02" | "03" | "04";
    correctionMethodDescription: string;
    additionalReasonDescription?: string;
    invoiceIssueDate?: string;
};

type InvoiceHeader = {
    invoiceNumber: string;
    invoiceSeriesCode?: string;
    invoiceDocumentType: "FC" | "FA" | "AF";
    invoiceClass: "OO" | "OR" | "OC" | "CO" | "CR" | "CC";
    corrective?: Corrective
};

type PlaceOfIssue = {
    postCode: string;
    placeOfIssueDescription?: string;
};

type ExchangeRateDetails = {
    exchangeRate: string;
    exchangeRateDate: string;
};

type InvoiceIssueData = {
    issueDate: string;
    operationDate?: string;
    placeOfIssue?: PlaceOfIssue;
    invoicingPeriod?: Period;
    invoiceCurrencyCode: string;
    exchangeRateDetails?: ExchangeRateDetails;
    taxCurencyCode: string;
    languageName: string;
    invoiceDescription?: string;
    receiverTransactionReference?: string;
    fileReference?: string;
    receiverContractReference?: string;
};

type TaxOutput = {
    taxTypeCode: string;
    taxRate: string;
    taxableBase: Amount;
    taxAmount?: Amount;
    specialTaxableBase?: Amount;
    specialTaxAmount?: Amount;
    equivalenceSurcharge?: string;
    equivalenceSurchargeAmount?: Amount;
};

type Tax = {
    taxTypeCode: string;
    taxRate: string;
    taxableBase: Amount;
    taxAmount?: Amount;
};

type Discount = {
    discountReason: string
    discountRate?: string;
    discountAmount: string;
};

type Charge = {
    chargeReason: string;
    chargeRate?: string;
    chargeAmount: string;
};

type Subsidy = {
    subsidyDescription: string;
    subsidyRate?: string;
    subsidyAmount: string;
};

type PaymentOnAccount = {
    paymentOnAccountDate: string;
    paymentOnAccountAmount: string;
};

type ReimbursableExpense = {
    reimbursableExpenseSellerParty?: TaxIdentification;
    reimbursableExpenseBuyerParty?: TaxIdentification;
    issueDate?: string;
    invoiceNumber?: string;
    invoiceSeriesCode?: string;
    reimbrusableExpenseAmount: string;
};

type AmountWithheld = {
    amountWithholdingReason: string;
    withholdingRate?: string;
    withholdingAmount: string;
}

type PaymentInKind = {
    paymentInKindReason: string;
    paymentInKindAmount: string;
}

type InvoiceTotals = {
    totalGrossAmount: string;
    generalDiscounts?: Discount[];
    generalSurcharges?: Charge[];
    totalGeneralDiscounts?: string;
    totalGeneralSurcharges?: string;
    totalGrossAmountBeforeTaxes: string;
    totalTaxOutputs: string;
    totalTaxesWithheld: string;
    invoiceTotal: string;
    subsidies?: Subsidy[];
    paymentsOnAccount?: PaymentOnAccount[];
    reimbrusableExpenses?: ReimbursableExpense[];
    totalFinancialExpenses?: string;
    totalOutstandingAmount: string;
    totalPaymentsOnAccount?: string;
    amountWithheld?: AmountWithheld;
    totalExecutableAmount: string;
    totalReimbursableExpenses?: string;
    paymentInKind?: PaymentInKind;
};

type DeliveryNote = {
    deliveryNoteNumber: string;
    deliveriNoteDate?: string;
}

type SpecialTaxableEvent = {
    specialTaxableEventCode: "01" | "02";
    specialTaxableEventReason: string;
}

type InvoiceLine = {
    issuerContractReference?: string;
    issuerContractDate?: string;
    issuerTransactionReference?: string;
    issuerTransactionDate?: string;
    receiverContractReference?: string;
    receiverContractDate?: string;
    receiverTransactionReference?: string;
    receiverTransactionDate?: string;
    fileReference?: string;
    fileDate?: string;
    sequenceNumber?: string;
    deliveryNotesReferences?: DeliveryNote[];
    itemDescription: string;
    quantity: string;
    unitOfMeasure?: string;
    unitPriceWithoutTax: string;
    totalCost: string;
    discountsAndRebates?: Discount[];
    charges?: Charge[];
    grossAmount: string;
    taxesWithheld?: Tax[];
    taxesOutputs: string[];
    lineItemPeriod?: Period;
    transactionDate?: string;
    additionalLineItemInformation?: string;
    specialTaxableEvent?: SpecialTaxableEvent;
    articleCode?: string;
    extensions?: Extensions;
};

type AttachedDocument = {
    attachmentCompressionAlgorithm?: "ZIP" | "GZIP" | "NONE";
    attachedFormat: "xml" | "doc" | "gif" | "rtf" | "html";
    attachmentEncoding?: "BASE64" | "BER" | "DER" | "NONE";
    attachmentDescription?: string;
    attachmentData: string;
};

type AdditionalData = {
    relatedInvoice?: string;
    relatedDocuments?: AttachedDocument[];
    invoiceAdditionalInformation?: string;
    extensions: Extensions;
};

interface Invoice {
    invoiceHeader: InvoiceHeader;
    invoiceIssueData: InvoiceIssueData;
    taxesOutputs: TaxOutput[];
    taxesWithheld?: Tax[];
    invoiceTotals: InvoiceTotals;
    items: InvoiceLine[];
    paymentDetails?: Installment[];
    legalIterals?: string[];
    additionalData?: AdditionalData;
}

type Extensions = [{
    label: string;
    value: string;
}];

