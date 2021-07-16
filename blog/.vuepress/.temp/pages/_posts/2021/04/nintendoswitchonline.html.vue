<template><h2 id="session-token" tabindex="-1"><a class="header-anchor" href="#session-token" aria-hidden="true">#</a> Session Token</h2>
<p>Access Token 取得のための Session Token を取得します。</p>
<h3 id="リクエスト" tabindex="-1"><a class="header-anchor" href="#リクエスト" aria-hidden="true">#</a> リクエスト</h3>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Method</td>
<td style="text-align:center">POST</td>
</tr>
<tr>
<td style="text-align:center">URL</td>
<td style="text-align:center">https://accounts.nintendo.com/connect/1.0.0/api/session_token</td>
</tr>
<tr>
<td style="text-align:center">User-Agent</td>
<td style="text-align:center">OnlineLounge/1.10.0 NASDKAPI iOS</td>
</tr>
</tbody>
</table>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>client_id=71b963c1b7b6d119&amp;session_token_code=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLm5pbnRlbmRvLmNvbSIsInN0YzpzY3AiOlswLDgsOSwxNywyM10sImp0aSI6IjM1NzQ1MTg5MTkxIiwic3RjOmMiOiJ0ejdaMGhfM2RLMTBYLTc5SlREWUUyaG5seGU1dWhYd0tsUldoQUdBb1ZZIiwic3RjOm0iOiJTMjU2Iiwic3ViIjoiNWFlOGY3YTc4YjBjY2E0ZCIsInR5cCI6InNlc3Npb25fdG9rZW5fY29kZSIsImV4cCI6MTYxOTQ3OTE0OSwiYXVkIjoiNzFiOTYzYzFiN2I2ZDExOSIsImlhdCI6MTYxOTQ3ODU0OX0.XSFscPYMGbcaLLJxBA-fIO0zzt1bWs4X39oZGOs4jrI&amp;session_token_code_verifier=RwKTiEojlJbQInnPCHBitkNHehgICjFsstWUvOkGQibeuukvXx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><code>client_id</code>の値は固定値です。</p>
<p>JSON ではなく Form-Data で Body を送信します。</p>
<h3 id="レスポンス" tabindex="-1"><a class="header-anchor" href="#レスポンス" aria-hidden="true">#</a> レスポンス</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"code"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLm5pbnRlbmRvLmNvbSIsInN1YiI6IjVhZThmN2E3OGIwY2NhNGQiLCJleHAiOjE2MTk0ODIxNTUsImlhdCI6MTYxOTQ3ODU1NSwidHlwIjoiY29kZSIsImF1ZCI6IjcxYjk2M2MxYjdiNmQxMTkiLCJhYzpzY3AiOlswLDgsOSwxNywyM10sImp0aSI6IjM1NzQ1MTYxODQzIn0.vT1aaYdqHaAinY0BKGDeG2cAUqS5DOndH02keQxZXxw"</span><span class="token punctuation">,</span>
  <span class="token property">"session_token"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzI1NiJ9.eyJzdDpzY3AiOlswLDgsOSwxNywyM10sInN1YiI6IjVhZThmN2E3OGIwY2NhNGQiLCJleHAiOjE2ODI1NTA1NTUsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMubmludGVuZG8uY29tIiwidHlwIjoic2Vzc2lvbl90b2tlbiIsImlhdCI6MTYxOTQ3ODU1NSwiYXVkIjoiNzFiOTYzYzFiN2I2ZDExOSIsImp0aSI6IjUwNjgwMjkzODEifQ.CwI0tqAv186pEgo7HKn_q--l8fB-jmwFu6iJNNvY_W8"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="access-token" tabindex="-1"><a class="header-anchor" href="#access-token" aria-hidden="true">#</a> Access Token</h2>
<p>Nintendo Switch Online のサービスに接続するための Access Token を取得します。</p>
<h3 id="リクエスト-1" tabindex="-1"><a class="header-anchor" href="#リクエスト-1" aria-hidden="true">#</a> リクエスト</h3>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Method</td>
<td style="text-align:center">POST</td>
</tr>
<tr>
<td style="text-align:center">URL</td>
<td style="text-align:center">https://accounts.nintendo.com/connect/1.0.0/api/token</td>
</tr>
<tr>
<td style="text-align:center">User-Agent</td>
<td style="text-align:center">OnlineLounge/1.10.0 NASDKAPI iOS</td>
</tr>
</tbody>
</table>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"client_id"</span><span class="token operator">:</span> <span class="token string">"71b963c1b7b6d119"</span><span class="token punctuation">,</span>
  <span class="token property">"session_token"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzI1NiJ9.eyJzdDpzY3AiOlswLDgsOSwxNywyM10sInN1YiI6IjVhZThmN2E3OGIwY2NhNGQiLCJleHAiOjE2ODI1NTA1NTUsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMubmludGVuZG8uY29tIiwidHlwIjoic2Vzc2lvbl90b2tlbiIsImlhdCI6MTYxOTQ3ODU1NSwiYXVkIjoiNzFiOTYzYzFiN2I2ZDExOSIsImp0aSI6IjUwNjgwMjkzODEifQ.CwI0tqAv186pEgo7HKn_q--l8fB-jmwFu6iJNNvY_W8"</span><span class="token punctuation">,</span>
  <span class="token property">"grant_type"</span><span class="token operator">:</span> <span class="token string">"urn:ietf:params:oauth:grant-type:jwt-bearer-session-token"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>client_id</code>, <code>grant_type</code>の値は固定値です。</p>
<h3 id="レスポンス-1" tabindex="-1"><a class="header-anchor" href="#レスポンス-1" aria-hidden="true">#</a> レスポンス</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"access_token"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1ZTNjN2FkLTBlMTQtNDIxMi1hZTg5LTExMjIwZmM3MDMzYSIsImprdSI6Imh0dHBzOi8vYWNjb3VudHMubmludGVuZG8uY29tLzEuMC4wL2NlcnRpZmljYXRlcyJ9.eyJhdWQiOiI3MWI5NjNjMWI3YjZkMTE5Iiwic3ViIjoiNWFlOGY3YTc4YjBjY2E0ZCIsImp0aSI6IjgyYzUzM2NjLWJkNzQtNDkwOC04NjVkLTAwOWM2MGM5MWY0NiIsImFjOnNjcCI6WzAsOCw5LDE3LDIzXSwiaWF0IjoxNjE5NDc4NTU2LCJpc3MiOiJodHRwczovL2FjY291bnRzLm5pbnRlbmRvLmNvbSIsImFjOmdydCI6NjQsInR5cCI6InRva2VuIiwiZXhwIjoxNjE5NDc5NDU2fQ.lXFbLqUIVFegSHzFvH3aLp1HOB3iwajs107YLt0MePrcqLDvmTpu_MNewGrnpX0BAAfB79lDGt7MFmi6HKcIQxacaExP7tIHYowmHBU5eDM4VSbZJq7LP8SMftRAcvDA1-bNOr3_uFhqtXP18mDDZRYfB7lEXVbcj3sdkNPrWlyic-vHwZTQ-qwMTWPLZzYwwGjage1OfpRwwC-YrU0hpgg-DIj5yTN-eCrwkp48rsQU_MOCw5--HRW90x-LU6rjK7_CgHG3Qafz4pvuYmRzDl3WWtoSGUdZCh6wF3SKta0GzReZIIic-iog3eo21vgagWbnEWz_86iYjsF9DAnPzQ"</span><span class="token punctuation">,</span>
  <span class="token property">"scope"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"openid"</span><span class="token punctuation">,</span> <span class="token string">"user"</span><span class="token punctuation">,</span> <span class="token string">"user.birthday"</span><span class="token punctuation">,</span> <span class="token string">"user.mii"</span><span class="token punctuation">,</span> <span class="token string">"user.screenName"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"token_type"</span><span class="token operator">:</span> <span class="token string">"Bearer"</span><span class="token punctuation">,</span>
  <span class="token property">"id_token"</span><span class="token operator">:</span> <span class="token string">"eyJqa3UiOiJodHRwczovL2FjY291bnRzLm5pbnRlbmRvLmNvbS8xLjAuMC9jZXJ0aWZpY2F0ZXMiLCJraWQiOiI1ZTkwMDRlOC1mMDNiLTRjZTEtYmU2Zi1jNzdlZTM4YTA4MjEiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2MTk0Nzk0NTYsImNvdW50cnkiOiJKUCIsInR5cCI6ImlkX3Rva2VuIiwiYXRfaGFzaCI6InVHUzZvQkJRQUJEN2hWMHJOdnpiS2ciLCJpYXQiOjE2MTk0Nzg1NTYsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMubmludGVuZG8uY29tIiwic3ViIjoiNWFlOGY3YTc4YjBjY2E0ZCIsImF1ZCI6IjcxYjk2M2MxYjdiNmQxMTkiLCJqdGkiOiI0NmJjZmRiMy00MmUyLTRmM2UtYjhlYy1jY2YyYzNmNWZjNGYifQ.qy0QMaQ_QsCajYZkkuHlfRtWETFSUtxKfddtAsRT2EBTGpBxNV2p3VsKtWnNHduH5ZvFKa978sqBmTqjSzfPDJEF2T4JciuXvlQL73zlSPN2GxmI65K030nyvGYebd_d7XRBEEtTKGTWuhHmkk_nglToBlKWr0QG23dWGTA2phJUUU2BKiB44Gdbcq4Fopdtu9wqhtxN2lWc_OtpdHaVlmuQfOXqNHI5ohHFp4wzjrsIUOzUTVtq3Br52c1umWoFxOxnlIHdiNz1bNGWbtY9YfJHdEe1PECyj_oB8cQgkz4DDLHHVFGYz5shtGLZ1JlewVERMQw4JzBD1SiNx1FVWw"</span><span class="token punctuation">,</span>
  <span class="token property">"expires_in"</span><span class="token operator">:</span> <span class="token number">900</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><code>id_token</code>の値は 1.10.0 現在死にステータスのためどこでも使われていません。</p>
<h2 id="user-info" tabindex="-1"><a class="header-anchor" href="#user-info" aria-hidden="true">#</a> User Info</h2>
<p>Access Token からユーザ情報を取得する API です。</p>
<p>Splatoon Token 取得時に生年月日などを渡す必要があるため取得しますが、生年月日などは適当に設定してもリクエストは通ります。ここで取得した生年月日をそのまま使うと 13 歳以下のアカウントの iksm session が取得できなくなるため、この API を叩く意味は実はあまりありません。</p>
<h3 id="リクエスト-2" tabindex="-1"><a class="header-anchor" href="#リクエスト-2" aria-hidden="true">#</a> リクエスト</h3>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Method</td>
<td style="text-align:center">GET</td>
</tr>
<tr>
<td style="text-align:center">URL</td>
<td style="text-align:center">https://api.accounts.nintendo.com/2.0.0/users/me</td>
</tr>
<tr>
<td style="text-align:center">User-Agent</td>
<td style="text-align:center">OnlineLounge/1.10.0 NASDKAPI iOS</td>
</tr>
<tr>
<td style="text-align:center">Authorization</td>
<td style="text-align:center">Bearer</td>
</tr>
</tbody>
</table>
<p>GET リクエストなのでパラメータは存在しません。</p>
<h3 id="レスポンス-2" tabindex="-1"><a class="header-anchor" href="#レスポンス-2" aria-hidden="true">#</a> レスポンス</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"emailOptedIn"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">"analyticsPermissions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"targetMarketing"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"updatedAt"</span><span class="token operator">:</span> <span class="token number">1595545468</span><span class="token punctuation">,</span>
      <span class="token property">"permitted"</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"internalAnalysis"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"permitted"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">"updatedAt"</span><span class="token operator">:</span> <span class="token number">1595545468</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"analyticsOptedIn"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"emailOptedInUpdatedAt"</span><span class="token operator">:</span> <span class="token number">1572596527</span><span class="token punctuation">,</span>
  <span class="token property">"gender"</span><span class="token operator">:</span> <span class="token string">"female"</span><span class="token punctuation">,</span>
  <span class="token property">"nickname"</span><span class="token operator">:</span> <span class="token string">"Salmonia"</span><span class="token punctuation">,</span>
  <span class="token property">"screenName"</span><span class="token operator">:</span> <span class="token string">"sa•••@g•••• / sal•••"</span><span class="token punctuation">,</span>
  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"5ae8f7a78b0cca4d"</span><span class="token punctuation">,</span>
  <span class="token property">"analyticsOptedInUpdatedAt"</span><span class="token operator">:</span> <span class="token number">1595545468</span><span class="token punctuation">,</span>
  <span class="token property">"clientFriendsOptedInUpdatedAt"</span><span class="token operator">:</span> <span class="token number">1572596527</span><span class="token punctuation">,</span>
  <span class="token property">"region"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
  <span class="token property">"language"</span><span class="token operator">:</span> <span class="token string">"en-US"</span><span class="token punctuation">,</span>
  <span class="token property">"clientFriendsOptedIn"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"country"</span><span class="token operator">:</span> <span class="token string">"JP"</span><span class="token punctuation">,</span>
  <span class="token property">"birthday"</span><span class="token operator">:</span> <span class="token string">"1996-09-01"</span><span class="token punctuation">,</span>
  <span class="token property">"eachEmailOptedIn"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"deals"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"optedIn"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token property">"updatedAt"</span><span class="token operator">:</span> <span class="token number">1572596527</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"survey"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"updatedAt"</span><span class="token operator">:</span> <span class="token number">1572596527</span><span class="token punctuation">,</span>
      <span class="token property">"optedIn"</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"candidateMiis"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"createdAt"</span><span class="token operator">:</span> <span class="token number">1572596527</span><span class="token punctuation">,</span>
  <span class="token property">"updatedAt"</span><span class="token operator">:</span> <span class="token number">1612832536</span><span class="token punctuation">,</span>
  <span class="token property">"timezone"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"utcOffset"</span><span class="token operator">:</span> <span class="token string">"+09:00"</span><span class="token punctuation">,</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Asia/Tokyo"</span><span class="token punctuation">,</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"Asia/Tokyo"</span><span class="token punctuation">,</span>
    <span class="token property">"utcOffsetSeconds"</span><span class="token operator">:</span> <span class="token number">32400</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"emailVerified"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"isChild"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">"mii"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h2 id="splatoon-token" tabindex="-1"><a class="header-anchor" href="#splatoon-token" aria-hidden="true">#</a> Splatoon Token</h2>
<p>Splatoon 用の Session Token を発行します。パラメータに f が必要なため s2s API と flapg API を使って f の値を計算する必要があります。</p>
<p>ここではまだ Bearer の値がないため、空文字を指定して大丈夫です。</p>
<h3 id="リクエスト-3" tabindex="-1"><a class="header-anchor" href="#リクエスト-3" aria-hidden="true">#</a> リクエスト</h3>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Method</td>
<td style="text-align:center">POST</td>
</tr>
<tr>
<td style="text-align:center">URL</td>
<td style="text-align:center">https://api-lp1.znc.srv.nintendo.net/v1/Account/Login</td>
</tr>
<tr>
<td style="text-align:center">X-ProductVersion</td>
<td style="text-align:center">1.10.0</td>
</tr>
<tr>
<td style="text-align:center">X-Platform</td>
<td style="text-align:center">iOS</td>
</tr>
<tr>
<td style="text-align:center">Authorization</td>
<td style="text-align:center">Bearer</td>
</tr>
</tbody>
</table>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"parameter"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"naIdToken"</span><span class="token operator">:</span> <span class="token string">"eyJqa3UiOiJodHRwczovL2FjY291bnRzLm5pbnRlbmRvLmNvbS8xLjAuMC9jZXJ0aWZpY2F0ZXMiLCJraWQiOiI1ZTkwMDRlOC1mMDNiLTRjZTEtYmU2Zi1jNzdlZTM4YTA4MjEiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2MTk0Nzk0NTYsImNvdW50cnkiOiJKUCIsInR5cCI6ImlkX3Rva2VuIiwiYXRfaGFzaCI6InVHUzZvQkJRQUJEN2hWMHJOdnpiS2ciLCJpYXQiOjE2MTk0Nzg1NTYsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMubmludGVuZG8uY29tIiwic3ViIjoiNWFlOGY3YTc4YjBjY2E0ZCIsImF1ZCI6IjcxYjk2M2MxYjdiNmQxMTkiLCJqdGkiOiI0NmJjZmRiMy00MmUyLTRmM2UtYjhlYy1jY2YyYzNmNWZjNGYifQ.qy0QMaQ_QsCajYZkkuHlfRtWETFSUtxKfddtAsRT2EBTGpBxNV2p3VsKtWnNHduH5ZvFKa978sqBmTqjSzfPDJEF2T4JciuXvlQL73zlSPN2GxmI65K030nyvGYebd_d7XRBEEtTKGTWuhHmkk_nglToBlKWr0QG23dWGTA2phJUUU2BKiB44Gdbcq4Fopdtu9wqhtxN2lWc_OtpdHaVlmuQfOXqNHI5ohHFp4wzjrsIUOzUTVtq3Br52c1umWoFxOxnlIHdiNz1bNGWbtY9YfJHdEe1PECyj_oB8cQgkz4DDLHHVFGYz5shtGLZ1JlewVERMQw4JzBD1SiNx1FVWw"</span><span class="token punctuation">,</span>
    <span class="token property">"naCountry"</span><span class="token operator">:</span> <span class="token string">"JP"</span><span class="token punctuation">,</span>
    <span class="token property">"naBirthday"</span><span class="token operator">:</span> <span class="token string">"1996-09-01"</span><span class="token punctuation">,</span>
    <span class="token property">"language"</span><span class="token operator">:</span> <span class="token string">"en-GB"</span><span class="token punctuation">,</span>
    <span class="token property">"requestId"</span><span class="token operator">:</span> <span class="token string">"931570c6-dc94-4110-85d0-9f76f91984a1"</span><span class="token punctuation">,</span>
    <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token number">1619478557344</span><span class="token punctuation">,</span>
    <span class="token property">"f"</span><span class="token operator">:</span> <span class="token string">"988df33f859e1b43981f72cc9cfb0d265236675ef8402fe9b7633eb1f63c73da5894ad48c8bc2f29"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="レスポンス-3" tabindex="-1"><a class="header-anchor" href="#レスポンス-3" aria-hidden="true">#</a> レスポンス</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"result"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"webApiServerCredential"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"expiresIn"</span><span class="token operator">:</span> <span class="token number">7200</span><span class="token punctuation">,</span>
      <span class="token property">"accessToken"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ3MzczNjA4MzEzODE1MDQsImV4cCI6MTYxOTQ4NTc1OCwiYXVkIjoiZjQxN2UxdGlianFkOTFjaDk5dTQ5aXd6NXNuOWNoeTMiLCJ0eXAiOiJpZF90b2tlbiIsImlhdCI6MTYxOTQ3ODU1OCwibWVtYmVyc2hpcCI6eyJhY3RpdmUiOnRydWV9LCJpc3MiOiJhcGktbHAxLnpuYy5zcnYubmludGVuZG8ubmV0In0.tjMhqXiaiO4keh5x17xJ1NKMxXw97wZ9xaJGYYOuB2U"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"user"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"membership"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"active"</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">4737360831381504</span><span class="token punctuation">,</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"まゆしぃのかみ"</span><span class="token punctuation">,</span>
      <span class="token property">"supportId"</span><span class="token operator">:</span> <span class="token string">"0457-8405-4211-3149-1927-5"</span><span class="token punctuation">,</span>
      <span class="token property">"imageUri"</span><span class="token operator">:</span> <span class="token string">"https://cdn-image-e0d67c509fb203858ebcb2fe3f88c2aa.baas.nintendo.com/1/6d55aa14478fbb82"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"firebaseCredential"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"expiresIn"</span><span class="token operator">:</span> <span class="token number">3600</span><span class="token punctuation">,</span>
      <span class="token property">"accessToken"</span><span class="token operator">:</span> <span class="token string">""</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">"correlationId"</span><span class="token operator">:</span> <span class="token string">"22bf5c73-fc96deb5"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="splatoon-access-token" tabindex="-1"><a class="header-anchor" href="#splatoon-access-token" aria-hidden="true">#</a> Splatoon Access Token</h2>
<p>Splatoon 用の Access Token を発行します。パラメータに f が必要なため s2s API と flapg API を使って f の値を計算する必要があります。</p>
<p>Bearer には Splatoon Token を指定する必要があります。</p>
<h3 id="リクエスト-4" tabindex="-1"><a class="header-anchor" href="#リクエスト-4" aria-hidden="true">#</a> リクエスト</h3>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Method</td>
<td style="text-align:center">POST</td>
</tr>
<tr>
<td style="text-align:center">URL</td>
<td style="text-align:center">https://api-lp1.znc.srv.nintendo.net/v2/Game/GetWebServiceToken</td>
</tr>
<tr>
<td style="text-align:center">X-ProductVersion</td>
<td style="text-align:center">1.10.0</td>
</tr>
<tr>
<td style="text-align:center">X-Platform</td>
<td style="text-align:center">iOS</td>
</tr>
<tr>
<td style="text-align:center">Authorization</td>
<td style="text-align:center">Bearer</td>
</tr>
</tbody>
</table>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"parameter"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">5741031244955648</span><span class="token punctuation">,</span>
    <span class="token property">"registrationToken"</span><span class="token operator">:</span> <span class="token string">"dd_wZbi4tFE:APA91bHnZVq2oP1KULwaeiBVnMjjbbohkwvbs12KpVHZEQKGoA0IroonA90HedfESD3YPntWakLsL-s6Zs6fDQTzQEO7ERQ9hH_pOAA-1q5wEHjysEribushAVv6_qpTwMyqgJ5sgcpQ"</span><span class="token punctuation">,</span>
    <span class="token property">"requestId"</span><span class="token operator">:</span> <span class="token string">"051d0912-db3a-4ef2-bc84-bace0e53b00f"</span><span class="token punctuation">,</span>
    <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token number">1619478597466</span><span class="token punctuation">,</span>
    <span class="token property">"f"</span><span class="token operator">:</span> <span class="token string">"46ae976cfce20def44f93dfd4a6f15df2e566809000bda3c03961ecb45ab3d4e2acc122b91e552209372cc527e64f7"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="レスポンス-4" tabindex="-1"><a class="header-anchor" href="#レスポンス-4" aria-hidden="true">#</a> レスポンス</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">"result"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"expiresIn"</span><span class="token operator">:</span> <span class="token number">7200</span><span class="token punctuation">,</span>
    <span class="token property">"accessToken"</span><span class="token operator">:</span> <span class="token string">"eyJ0eXAiOiJKV1QiLCJqa3UiOiJodHRwczovL2FwaS1scDEuem5jLnNydi5uaW50ZW5kby5uZXQvdjEvV2ViU2VydmljZS9DZXJ0aWZpY2F0ZS9MaXN0IiwiYWxnIjoiUlMyNTYiLCJraWQiOiJFT3FCRV83dUxpVEFaUFJCc0hfYXpqazJ2bU0ifQ.eyJ0eXAiOiJpZF90b2tlbiIsImlhdCI6MTYxOTQ3ODU5OCwiZXhwIjoxNjE5NDg1Nzk4LCJhdWQiOiI1dm8yaTJrbXp4NnBzMWwxdmpzamduanM5OXltemN3MCIsImlzcyI6ImFwaS1scDEuem5jLnNydi5uaW50ZW5kby5uZXQiLCJtZW1iZXJzaGlwIjp7ImFjdGl2ZSI6dHJ1ZX0sImxpbmtzIjp7Im5ldHdvcmtTZXJ2aWNlQWNjb3VudCI6eyJpZCI6IjNmODljMzc5MWM0M2VhNTcifX0sInN1YiI6NDczNzM2MDgzMTM4MTUwNCwianRpIjoiMzEyYjAzYWEtYzliNy00YzBmLTg3YzktNzhhNTU3NzAwMmI4In0.U-EIVuza_6L6e7hZDyzvgdYrMnl5fr5DF0iDdVPCk9-MMibE2RtLYomTiCqVSPSMVV8lJqdxviZiOrilJEPn-kWr1Nk9ThAlh-pFngzwxKu8AJxkiTnYnuTOOV8GWrV3ceU6s3eGW-SNQiZPvkb-MXTc4RQln1wxtdL2nkQ6Pgp8Azar33FR-vjI7Zrbht6oGBc7t5eG7YXXaw02DAbsVwt7pb3etkfJUkZ37-_RZz1TLliUVfrocor3TuA9mV141P3r0Wk-pEiaTErJSH14jKyiTdE3iwYFgERNXLn9mgFHDjstv-TtkaoIYXbFLXx6j6iIbLrZGDDyrne9gA4m9g"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"correlationId"</span><span class="token operator">:</span> <span class="token string">"00e40134-b137d243"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></template>
