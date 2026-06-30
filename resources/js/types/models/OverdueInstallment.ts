import { Member } from "./Member";

export interface OverdueInstallment {
    id: number;

    member_id: number;

    period: string;

    created_at: string;

    updated_at?: string;

    member?: Member;
}

export interface OverdueInstallmentSummary {

    member: Member;

    total: number;

    periods: string[];

}