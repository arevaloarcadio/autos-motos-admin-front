export interface ModelsResponse {
    data: Data;
}

export interface Data {
    current_page:   number;
    data:           Models[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Models {
    id:                  string;
    name:                string;
    make_id:             string;
    is_active:           number;
    ad_type:             string;
    external_id:         number;
    external_updated_at: Date;
    resource_url:        string;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}
