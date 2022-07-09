"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zing = void 0;
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
class zingmp3 {
    constructor(URL, API_KEY, SECRET_KEY, CTIME, VERSION) {
        this.URL = URL;
        this.API_KEY = API_KEY;
        this.SECRET_KEY = SECRET_KEY;
        this.CTIME = CTIME;
        this.VERSION = VERSION;
    }
    // Hash signature
    get_hash_256(str) {
        return crypto_1.default.createHash("sha256").update(str).digest("hex");
    }
    get_hmac_512(str, key) {
        const hmac = crypto_1.default.createHmac("sha512", key);
        return hmac.update(Buffer.from(str, "utf-8")).digest("hex");
    }
    hash_has_id_signature(api_path, id) {
        return this.get_hmac_512(api_path + this.get_hash_256(`ctime=${this.CTIME}id=${id}version=${this.VERSION}`), this.SECRET_KEY);
    }
    hash_no_id_signature(api_path) {
        return this.get_hmac_512(api_path + this.get_hash_256(`ctime=${this.CTIME}version=${this.VERSION}`), this.SECRET_KEY);
    }
    hash_home_radio_signature(api_path, count) {
        return this.get_hmac_512(api_path + this.get_hash_256(`count=${count}ctime=${this.CTIME}page=1version=${this.VERSION}`), this.SECRET_KEY);
    }
    hash_list_genre_signature(api_path, id, page) {
        return this.get_hmac_512(api_path + this.get_hash_256(`count=10ctime=${this.CTIME}id=${id}page=${page}version=${this.VERSION}`), this.SECRET_KEY);
    }
    hash_list_mv_signature(api_path, count, id, type, page) {
        return this.get_hmac_512(api_path + this.get_hash_256(`count=${count}ctime=${this.CTIME}id=${id}page=${page}type=${type}version=${this.VERSION}`), this.SECRET_KEY);
    }
    hash_catergory_mv_signature(api_path, id, type) {
        return this.get_hmac_512(api_path + this.get_hash_256(`ctime=${this.CTIME}id=${id}type=${type}version=${this.VERSION}`), this.SECRET_KEY);
    }
    hash_search_signature(api_path, count, page, type) {
        return this.get_hmac_512(api_path + this.get_hash_256(`count=${count}ctime=${this.CTIME}page=${page}type=${type}version=${this.VERSION}`), this.SECRET_KEY);
    }
    // Get Cookie
    async get_cookie() {
        try {
            const response = await axios_1.default.get(`${this.URL}`);
            const cookie_jar = response.headers["set-cookie"];
            const cookie = cookie_jar === null || cookie_jar === void 0 ? void 0 : cookie_jar.filter((_value, index) => index === 1)[0];
            return cookie;
        }
        catch (error) {
            return error;
        }
    }
    // Send Request
    async send_request(api_path, params, is_suggestion = false) {
        // Change base url for suggestion keyword
        const client = axios_1.default.create({
            baseURL: is_suggestion ? "https://ac.zingmp3.vn" : this.URL,
        });
        client.interceptors.response.use((response) => response.data);
        try {
            const cookie = await this.get_cookie();
            const response = await client.get(api_path, {
                headers: {
                    Cookie: cookie,
                },
                params: Object.assign(Object.assign({}, params), { ctime: this.CTIME, version: this.VERSION, apiKey: this.API_KEY })
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_home() {
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
        }
        catch (error) {
            return error;
        }
    }
    async get_song(id) {
        const api_path = "/api/v2/song/get/streaming";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_song_info(id) {
        const api_path = "/api/v2/song/get/info";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_song_lyric(id) {
        const api_path = "/api/v2/lyric/get/lyric";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_home_chart() {
        const api_path = "/api/v2/page/get/chart-home";
        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_new_release_chart() {
        const api_path = "/api/v2/page/get/newrelease-chart";
        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_week_chart(id, week = 0, year = 0) {
        const api_path = "/api/v2/page/get/week-chart";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                week: week,
                year: year,
                sig: this.hash_has_id_signature(api_path, id)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_radio() {
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
        }
        catch (error) {
            return error;
        }
    }
    async get_list_by_genre(id, page = 1) {
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
        }
        catch (error) {
            return error;
        }
    }
    async get_artist(name) {
        const api_path = "/api/v2/page/get/artist";
        try {
            const response = await this.send_request(api_path, {
                alias: name,
                sig: this.hash_no_id_signature(api_path)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_hub_home() {
        const api_path = "/api/v2/page/get/hub-home";
        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_hub_detail(id) {
        const api_path = "/api/v2/page/get/hub-detail";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_top_100() {
        const api_path = "/api/v2/page/get/top-100";
        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_list_mv(id, page = 1, count = 15, sort = "listen") {
        const api_path = "/api/v2/video/get/list";
        const sort_list = ["listen", "hot", "new"];
        const type = "genre";
        try {
            if (!sort_list.includes(sort))
                throw "Sort must be listen || hot || new.";
            const response = await this.send_request(api_path, {
                id: id,
                type: type,
                page: page,
                count: count,
                sort: sort,
                sig: this.hash_list_mv_signature(api_path, count, id, type, page)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_category_mv(id) {
        const api_path = "/api/v2/genre/get/info";
        const type = "video";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                type: type,
                sig: this.hash_catergory_mv_signature(api_path, id, type)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_mv(id) {
        const api_path = "/api/v2/page/get/video";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_playlist(id) {
        const api_path = "/api/v2/page/get/playlist";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_suggested_playlists(id) {
        const api_path = "/api/v2/playlist/get/section-bottom";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_events() {
        const api_path = "/api/v2/event/get/list-incoming";
        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async get_event_info(id) {
        const api_path = "/api/v2/event/get/info";
        try {
            const response = await this.send_request(api_path, {
                id: id,
                sig: this.hash_has_id_signature(api_path, id)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    // Search all (Music, Playlist, Artist, Video)
    async search_all(keyword) {
        const api_path = "/api/v2/search/multi";
        try {
            const response = await this.send_request(api_path, {
                q: keyword,
                sig: this.hash_no_id_signature(api_path)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    async search_by_type(keyword, type, page = 1, count = 18) {
        const api_path = "/api/v2/search";
        const type_list = ["song", "playlist", "artist", "video"];
        try {
            if (!type_list.includes(type))
                throw "Type must be song || playlist || artist || video.";
            const response = await this.send_request(api_path, {
                q: keyword,
                type: type,
                page: page,
                count: count,
                sig: this.hash_search_signature(api_path, count, page, type)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    // Default suggest keyword
    async get_recommend_keyword() {
        const api_path = "/api/v2/app/get/recommend-keyword";
        try {
            const response = await this.send_request(api_path, {
                sig: this.hash_no_id_signature(api_path)
            });
            return response;
        }
        catch (error) {
            return error;
        }
    }
    // Suggest keyword when searching
    async get_suggestion_keyword(keyword) {
        const api_path = "/v1/web/suggestion-keywords";
        try {
            const response = await this.send_request(api_path, {
                num: "10",
                query: keyword,
                language: "vi",
                sig: this.hash_no_id_signature(api_path)
            }, true);
            return response;
        }
        catch (error) {
            return error;
        }
    }
}
const URL = "https://zingmp3.vn";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";
const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab";
const CTIME = String(Math.floor(Date.now() / 1000));
const VERSION = "1.6.40";
exports.zing = new zingmp3(URL, API_KEY, SECRET_KEY, CTIME, VERSION);
//# sourceMappingURL=index.js.map