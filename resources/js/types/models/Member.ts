import { Collector } from './Collector';

export interface Member {
    id: number;
    full_name: string;
    national_id: string;
    phone: string | null;
    collection_address: string;
    membership_frequency: 'MONTHLY' | 'SEMIANNUAL' | 'ANNUAL';
    collector_id: number;

    collector?: Collector;

    created_at?: string;
    updated_at?: string;
}