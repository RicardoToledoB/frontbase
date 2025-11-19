export interface RegisterHistory {
  id?: number;
  action: string;
  jsonBefore:string;
  jsonAfter:string;
  jsonDiff:string;
  register?: {
    id?: number;
    n_inventary: string;
    date_reception: string;
    n_memo: string;
    project: string;
    financing: string;
    n_acta_reception: string;
    date_acta_reception: string;
    purchase_order: string;
    acquisition_value: string;
    provider: string;
    rut_provider: string;
    n_fact: string;
    date_fact: string;
    amount_fact: string;
    n_dispatch_guide: string;
    date_dispatch_guide: string;
    amount_dispatch_guide: string;
    description_property: string;
    brand: string;
    model: string;
    n_serie: string;
    n_res_info: string;
    date_res_info: string;
    observation_state: string;
    n_res_gore: string;
    date_res_gore: string;
    n_res_accept: string;
    date_res_accept: string;
    state: string;
    stablishment?: {
      id: number;
      name?: string;
    };
    user?: {
      id: number;
      firstName: string;
      secondName?: string;
      firstLastName: string;
      secondLastName?: string;
      email: string;
    };
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
  };
  user?: {
    id: number;
    firstName: string;
    secondName?: string;
    firstLastName: string;
    secondLastName?: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
