import { Member } from './Member';

export interface Loan {
    id: number;
    member_id: number;
    collection_address: string;
    item_name: string;
    quantity: number;
    loan_date: string;

    member?: Member;

    created_at?: string;
    updated_at?: string;
}