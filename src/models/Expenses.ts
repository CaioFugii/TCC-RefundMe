interface Owner
{
  _id?:string;
  name: string;
  email: string;
}

export interface ExpensesModel {
    _id?:any;
    date: any;
    classification: string;
    value: number;
    file: any;
    // description: string;
    status?: string;
    owner: Owner;
  }