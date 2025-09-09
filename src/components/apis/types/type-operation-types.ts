export type OperationCategory = {
  id: string;
  name: string;
};

export type CustomField = {
  id: string;
  name: string;
  label: string;
  type: string; // e.g. "number", "text", etc.
  required: boolean;
  possibleValues: { id: string; name: string }[] | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type TypeOperation = {
  id: string;
  name: string;
  operationTypeId: string;
  operationCategory?: OperationCategory;
  customFields: {
    id: string;
    operationId: string;
    customFieldId: string;
    required: boolean;
    order: number;
    customField: CustomField;
  }[];
};
