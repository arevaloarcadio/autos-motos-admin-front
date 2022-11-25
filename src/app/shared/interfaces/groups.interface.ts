export interface GroupsResponse {
    data: Group[];
}

export interface Group {
    id:         string;
    name:       string;
    make_id:    string;
    created_at: Date;
    updated_at: Date;
    value:      null | string;
    models:     Model[];
}

export interface Model {
    id:                  string;
    name:                string;
    slug:                string;
    make_id:             string;
    sub_model_id:        string;
    is_active:           number;
    ad_type:             string;
    external_id:         number | null;
    external_updated_at: Date;
    created_at:          Date;
    updated_at:          Date;
    resource_url:        string;
}
