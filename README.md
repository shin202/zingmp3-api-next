
# ZingMp3 API






### Based On [ZingMp3API](https://github.com/whoant/ZingMp3API) by Whoant. 💖Thanks a lot 💖
## Installation


```bash
  npm i zingmp3-api-next
```

    
## Features

* [Get Home](#get-home)
* [Get Song](#get-song)
* [Get Song Info](#get-song-info)
* [Get Song Lyrics](#get-song-lyrics)
* [Get Home Chart / New Release Chart / Week Chart](#get-chart)
* [Get Radio](#get-radio)
* [Get New Feeds](#get-new-feeds)
* [Get Artist](#get-artist)
* [Get Hub Home / Hub Detail (Category)](#get-hub)
* [Get Top 100](#get-top-100)
* And More......... (See below)

## Usage/Examples

```javascript
  const { zing } = require("zingmp3-api-next");
```

### Get Home
Get data on the homepage.

```javascript
<!-- Promise -->
zing.get_home()
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_home();
  console.log(data);
})();
```

### Get Song
Parameters:
* id: string (required)

Example: https://zingmp3.vn/bai-hat/All-Falls-Down-Alan-Walker-Noah-Cyrus-Digital-Farm-Animals/ZW8WOI6U.html

=> The ID is: ZW8WOI6U

```javascript
<!-- Promise -->
zing.get_song("ZW8WOI6U")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_song("ZW8WOI6U");
  console.log(data);
})();
```

### Get Song Info
Parameters:
* id: string (required)

Example: https://zingmp3.vn/bai-hat/All-Falls-Down-Alan-Walker-Noah-Cyrus-Digital-Farm-Animals/ZW8WOI6U.html

=> The ID is: ZW8WOI6U

```javascript
<!-- Promise -->
zing.get_song_info("ZW8WOI6U")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_song_info("ZW8WOI6U");
  console.log(data);
})();
```

### Get Song Lyrics
Parameters:
* id: string (required)

Example: https://zingmp3.vn/bai-hat/All-Falls-Down-Alan-Walker-Noah-Cyrus-Digital-Farm-Animals/ZW8WOI6U.html

=> The ID is: ZW8WOI6U

```javascript
<!-- Promise -->
zing.get_song_lyric("ZW8WOI6U")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_song_lyric("ZW8WOI6U");
  console.log(data);
})();
```

### Get Chart
* Home Chart
```javascript
<!-- Promise -->
zing.get_home_chart()
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_home_chart();
  console.log(data);
})();
```

* New Release Chart
```javascript
<!-- Promise -->
zing.get_new_release_chart()
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_new_release_chart();
  console.log(data);
})();
```

* Week Chart 

Parameters:

* id: string (required)
* week: number (optional)(default: 0)
* year: number (optional)(default: 0)

Example: https://zingmp3.vn/zing-chart-tuan/Bai-hat-Viet-Nam/IWZ9Z08I.html

=> The ID is: IWZ9Z08I

```javascript
<!-- Promise -->
zing.get_week_chart("IWZ9Z08I")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_week_chart("IWZ9Z08I");
  console.log(data);
})();
```

### Get Radio
```javascript
<!-- Promise -->
zing.get_radio()
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_radio();
  console.log(data);
})();
```

### Get New Feeds
Parameters:
* id: string (required)
* page: number (optional)(default: 1)

Example: https://zingmp3.vn/the-loai-nghe-si/Viet-Nam/IWZ9Z08I.html

=> The ID is: IWZ9Z08I

```javascript
<!-- Promise -->
zing.get_list_by_genre("IWZ9Z08I")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_list_by_genre("IWZ9Z08I");
  console.log(data);
})();
```

### Get Artist
Parameters:
* name: string (required)

Example: "Alan-Walker"

```javascript
<!-- Promise -->
zing.get_artist("Alan-Walker")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_artist("Alan-Walker");
  console.log(data);
})();
```

### Get Hub
* Hub Home
```javascript
<!-- Promise -->
zing.get_hub_home()
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_hub_home();
  console.log(data);
})();
```

* Hub Detail

Parameters:

* id: string (required)

Example: https://zingmp3.vn/hub/Khuc-Nhac-Vui/IWZ9Z09A.html

=> The ID is: IWZ9Z09A

```javascript
<!-- Promise -->
zing.get_hub_detail("IWZ9Z09A")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_hub_detail("IWZ9Z09A");
  console.log(data);
})();
```

### Get TOP 100
```javascript
<!-- Promise -->
zing.get_top_100()
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_top_100();
  console.log(data);
})();
```

### Get List MV
Parameters:
* id: string (required)
* page: number (optional)(default: 1)
* count: number (optional)(default: 15)
* sort: string (optional)(default: "listen")

Example: https://zingmp3.vn/the-loai-video/Viet-Nam/IWZ9Z08I.html

=> The ID is: IWZ9Z08I

```javascript
<!-- Promise -->
zing.get_list_mv("IWZ9Z08I")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_list_mv("IWZ9Z08I");
  console.log(data);
})();
```

### Get Category MV
Parameters:
* id: string (required)

Example: https://zingmp3.vn/the-loai-video/EDM-Viet/IWZ97FCE.html

=> The ID is: IWZ97FCE

```javascript
<!-- Promise -->
zing.get_category_mv("IWZ97FCE")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_category_mv("IWZ97FCE");
  console.log(data);
})();
```

### Get MV
Parameters:
* id: string (required)

Example: https://zingmp3.vn/video-clip/Tup-Leu-Vang-Nguyen-Dinh-Vu-ACV/ZUZBBOFF.html

=> The ID is: ZUZBBOFF

```javascript
<!-- Promise -->
zing.get_mv("ZUZBBOFF")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_mv("ZUZBBOFF");
  console.log(data);
})();
```

### Get Playlist
Parameters:
* id: string (required)

Example: https://zingmp3.vn/album/Today-s-EDM-Hits-The-Chainsmokers-Alan-Walker-Alesso-Topic/ZODAB8EF.html

=> The ID is: ZODAB8EF

```javascript
<!-- Promise -->
zing.get_playlist("ZODAB8EF")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_playlist("ZODAB8EF");
  console.log(data);
})();
```

### Get Suggested Playlists
Get Suggested Playlists at the bottom of playlist page.

Parameters: 
* id: string (required)

Example: https://zingmp3.vn/album/Today-s-EDM-Hits-The-Chainsmokers-Alan-Walker-Alesso-Topic/ZODAB8EF.html

=> The ID is: ZODAB8EF

```javascript
<!-- Promise -->
zing.get_suggested_playlists("ZODAB8EF")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_suggested_playlists("ZODAB8EF");
  console.log(data);
})();
```

### Get Events
Get Incoming Events

```javascript
<!-- Promise -->
zing.get_events()
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_events();
  console.log(data);
})();
```

### Get Event Info
Parameters:
* id: string (required)

Example: https://zingmp3.vn/event/IWZ97FZF.html

=> The ID is: IWZ97FZF

```javascript
<!-- Promise -->
zing.get_event_info("IWZ97FZF")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_event_info("IWZ97FZF");
  console.log(data);
})();
```

### Search All 
Search All (Includes Music, Playlist, Artist, Video)

Parameters:
* keyword: string (required)

Example: "Alan Walker"

```javascript
<!-- Promise -->
zing.search_all("Alan Walker")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.search_all("Alan Walker");
  console.log(data);
})();
```

### Search by Type
Search by Type (Music || Playlist || Artist || Video)

Parameters:
* keyword: string (required)
* type: string (required)
* page: number (optional)(default: 1)
* count: number (optional)(default: 18)

Example: keyword: "Alan Walker", type: "song"

```javascript
<!-- Promise -->
zing.search_by_type("Alan Walker", "song")
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.search_by_type("Alan Walker", "song");
  console.log(data);
})();
```

### Get Recommend Keyword
Default suggestion keyword on the homepage

```javascript
<!-- Promise -->
zing.get_recommend_keyword()
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_recommend_keyword();
  console.log(data);
})();
```

### Get Suggestion Keyword
Suggestion keyword when you search

Parameters:
* keyword: string (optional)

```javascript
<!-- Promise -->
zing.get_suggestion_keyword()
.then(data => console.log(data))
or
<!-- async / await -->
(async() => {
  const data = await zing.get_suggestion_keyword();
  console.log(data);
})();
```
