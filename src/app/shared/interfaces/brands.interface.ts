export interface BrandsResponse {
    data: Data;
}

export interface Data {
    current_page:   number;
    data:           Brands[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  number;
    path:           string;
    per_page:       number;
    prev_page_url:  number;
    to:             number;
    total:          number;
}

export interface Brands {
    id:                  string;
    name:                string;
    is_active:           number;
    ad_type:             string;
    external_id:         number | null;
    external_updated_at: Date | null;
    has_sub_model:       number;
    resource_url:        string;
    grupos:              Grupo[];
}

export interface Grupo {
    id:         string;
    name:       string;
    make_id:    string;
    created_at: Date;
    updated_at: Date;
    value:      null | string;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}
