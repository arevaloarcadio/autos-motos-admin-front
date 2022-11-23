export interface GroupsResponse {
    data:    Brands[];
    message: string;
    ok:      boolean;
}

export interface Brands {
    id:           string;
    name:         string;
    resource_url: string;
}
