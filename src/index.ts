import crypto from "crypto";
import axios from "axios";

class zingmp3 {
    private URL: string;
    private API_KEY: string;
    private SECRET_KEY: string;
    private CTIME: string;
    private VERSION: string

    constructor(URL: string, API_KEY: string, SECRET_KEY: string, CTIME: string, VERSION: string) {
        this.URL = URL;
        this.API_KEY = API_KEY;
        this.SECRET_KEY = SECRET_KEY;
        this.CTIME = CTIME;
        this.VERSION = VERSION;
    }

    // Hash signature
    private get_hash_256(str: string): string {
        return crypto.createHash("sha256").update(str).digest("hex");
    }

    private get_hmac_512(str: string, key: string): string {
        const hmac = crypto.createHmac("sha512", key);
        return hmac.update(Buffer.from(str, "utf-8")).digest("hex");
    }

    private hash_has_id_signature(api_path: string, id: string): string {
        return this.get_hmac_512(
            api_path + this.get_hash_256(`ctime=${this.CTIME}id=${id}version=${this.VERSION}`),
            this.SECRET_KEY
        );
    }

    private hash_no_id_signature(api_path: string): string {
        return this.get_hmac_512(
            api_path + this.get_hash_256(`ctime=${this.CTIME}version=${this.VERSION}`),
            this.SECRET_KEY
        );
    }

    private hash_home_radio_signature(api_path: string, count: number): string {
        return this.get_hmac_512(
            api_path + this.get_hash_256(`count=${count}ctime=${this.CTIME}page=1version=${this.VERSION}`),
            this.SECRET_KEY
        );
    }

    private hash_list_genre_signature(api_path: string, id: string, page: number): string {
        return this.get_hmac_512(
            api_path + this.get_hash_256(`count=10ctime=${this.CTIME}id=${id}page=${page}version=${this.VERSION}`),
            this.SECRET_KEY
        );
    }

    private hash_list_mv_signature(api_path: string, count: number, id: string, type: string, page: number): string {
        return this.get_hmac_512(
            api_path + this.get_hash_256(`count=${count}ctime=${this.CTIME}id=${id}page=${page}type=${type}version=${this.VERSION}`),
            this.SECRET_KEY
        );
    }

    private hash_catergory_mv_signature(api_path: string, id: string, type: string): string {
        return this.get_hmac_512(
            api_path + this.get_hash_256(`ctime=${this.CTIME}id=${id}type=${type}version=${this.VERSION}`),
            this.SECRET_KEY
        );
    }

    private hash_search_signature(api_path: string, count: number, page: number, type: string): string {
        return this.get_hmac_512(
            api_path + this.get_hash_256(`count=${count}ctime=${this.CTIME}page=${page}type=${type}version=${this.VERSION}`),
            this.SECRET_KEY
        );
    }

    // Get Cookie
    private async get_cookie(): Promise<any> {
        try {
            const response = await axios.get(`${this.URL}`);
            const cookie_jar: string[] | undefined = response.headers["set-cookie"];
            const cookie = cookie_jar?.filter((_value, index) => index === 1)[0];

            return cookie;
        } catch (error) {
            return error;
        }
    }

    // Send Request
    private async send_request(api_path: string, params: object, is_suggestion = false): Promise<any> {
        // Change base url for suggestion keyword
        const client = axios.create({
            baseURL: is_suggestion ? "https://ac.zingmp3.vn" : this.URL,
        });

        client.interceptors.response.use((response) => response.data);

        try {
            const cookie = await this.get_cookie();
            const response = await client.get(api_path, {
                headers: {
                    Cookie: cookie,
                },
                params: {
                    ...params,
                    ctime: this.CTIME,
                    version: this.VERSION,
                    apiKey: this.API_KEY,
                }
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_home(): Promise<any> {
        const api_path = "/api/v2/page/get/home";
        const count = 30;

        try {
            const response = await this.send_request(api_path, {
                page: "1",
                count: count,
                segmentId: "-1",
                sig: this.hash_home_radio_signature(api_path, count)
            });
            
            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_song(id: string): Promise<any> {
        const api_path = "/api/v2/song/get/streaming";

        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_song_info(id: string): Promise<any> {
        const api_path = "/api/v2/song/get/info";

        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_song_lyric(id: string): Promise<any> {
        const api_path = "/api/v2/lyric/get/lyric";

        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_home_chart(): Promise<any> {
        const api_path = "/api/v2/page/get/chart-home";

        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_new_release_chart(): Promise<any> {
        const api_path = "/api/v2/page/get/newrelease-chart";

        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_week_chart(id: string, week: number = 0, year: number = 0): Promise<any> {
        const api_path = "/api/v2/page/get/week-chart";

        try {
            const response = await this.send_request(api_path, {
                id: id,
                week: week,
                year: year,
                sig: this.hash_has_id_signature(api_path, id)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_radio(): Promise<any> {
        const api_path = "/api/v2/page/get/radio";
        const count = 10;
        const page = 1;

        try {
            const response = await this.send_request(api_path, {
                page: page,
                count: count,
                sig: this.hash_home_radio_signature(api_path, count)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_list_by_genre(id: string, page: number = 1): Promise<any> {
        const api_path = "/api/v2/feed/get/list-by-genre";
        const count = 10;
        
        try {
            const response = await this.send_request(api_path, {
                id: id,
                page: page,
                count: count,
                sig: this.hash_list_genre_signature(api_path, id, page)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_artist(name: string): Promise<any> {
        const api_path = "/api/v2/page/get/artist";

        try {
            const response = await this.send_request(api_path, {
                alias: name,
                sig: this.hash_no_id_signature(api_path)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_hub_home(): Promise<any> {
        const api_path = "/api/v2/page/get/hub-home";

        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_hub_detail(id: string): Promise<any> {
        const api_path = "/api/v2/page/get/hub-detail";

        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_top_100(): Promise<any> {
        const api_path = "/api/v2/page/get/top-100";

        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });
    
            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_list_mv(id: string, page: number = 1, count: number = 15, sort: string = "listen"): Promise<any> {
        const api_path = "/api/v2/video/get/list";
        const sort_list = ["listen", "hot", "new"];
        const type = "genre";

        try {
            if (!sort_list.includes(sort)) throw "Sort must be listen || hot || new.";
            

            const response = await this.send_request(api_path, {
                id: id,
                type: type,
                page: page,
                count: count,
                sort: sort,
                sig: this.hash_list_mv_signature(api_path, count, id, type, page)
            });
    
            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_category_mv(id: string): Promise<any> {
        const api_path = "/api/v2/genre/get/info";
        const type = "video";

        try {
            const response = await this.send_request(api_path, {
                id: id,
                type: type,
                sig: this.hash_catergory_mv_signature(api_path, id, type)
            });
    
            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_mv(id: string): Promise<any> {
        const api_path = "/api/v2/page/get/video";

        try {
            const response =  await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
    
            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_playlist(id: string): Promise<any> {
        const api_path = "/api/v2/page/get/playlist";

        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
    
            return response;
        } catch (error) {
            return error;
        }

    }

    public async get_suggested_playlists(id: string): Promise<any> {
        const api_path = "/api/v2/playlist/get/section-bottom";

        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_events(): Promise<any> {
        const api_path = "/api/v2/event/get/list-incoming";

        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });
    
            return response;
        } catch (error) {
            return error;
        }
    }

    public async get_event_info(id: string): Promise<any> {
        const api_path = "/api/v2/event/get/info";

        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
    
            return response;
        } catch (error) {
            return error;
        }
    }

    // Search all (Music, Playlist, Artist, Video)
    public async search_all(keyword: string): Promise<any> {
        const api_path = "/api/v2/search/multi";

        try {
            const response = await this.send_request(api_path, {
                q: keyword,
                sig: this.hash_no_id_signature(api_path)
            });
    
            return response;
        } catch (error) {
            return error;
        }
    }

    public async search_by_type(keyword: string, type: string, page: number = 1, count: number = 18): Promise<any> {
        const api_path = "/api/v2/search";
        const type_list = ["song", "playlist", "artist", "video"];
        try {
            if (!type_list.includes(type)) throw "Type must be song || playlist || artist || video.";

            const response = await this.send_request(api_path, {
                q: keyword,
                type: type,
                page: page,
                count: count,
                sig: this.hash_search_signature(api_path, count, page, type)
            });
    
            return response;
        } catch (error) {
            return error;
        }
    }

    // Default suggest keyword
    public async get_recommend_keyword(): Promise<any> {
        const api_path = "/api/v2/app/get/recommend-keyword";

        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });
    
            return response;
        } catch (error) {
            return error;
        }
    }

    // Suggest keyword when searching
    public async get_suggestion_keyword(keyword?: string): Promise<any> {
        const api_path = "/v1/web/suggestion-keywords";

        try {
            const response = await this.send_request(api_path, {
                num: "10",
                query: keyword,
                language: "vi",
                sig: this.hash_no_id_signature(api_path)
            }, true);
    
            return response;
        } catch (error) {
            return error;
        }
    }
}

const URL: string = "https://zingmp3.vn";
const API_KEY: string = "88265e23d4284f25963e6eedac8fbfa3";
const SECRET_KEY: string = "2aa2d1c561e809b267f3638c4a307aab";
const CTIME: string = String(Math.floor(Date.now() / 1000));
const VERSION: string = "1.6.40";

export const zing = new zingmp3(
    URL,
    API_KEY,
    SECRET_KEY,
    CTIME,
    VERSION
);