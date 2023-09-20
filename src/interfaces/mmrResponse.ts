export interface MmrResponse {
    currenttier:             number;
    currenttierpatched:      string;
    images:                  Images;
    ranking_in_tier:         number;
    mmr_change_to_last_game: number;
    elo:                     number;
    name:                    string;
    tag:                     string;
    old:                     boolean;
}

export interface Images {
    small:         string;
    large:         string;
    triangle_down: string;
    triangle_up:   string;
}
