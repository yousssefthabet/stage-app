export enum ValueSourceType {
  customer,
  user,
  other,
}

export type TypeSource = {
  id: string;
  name: string;
  slug: string;
  valueSourceType: ValueSourceType;
};
