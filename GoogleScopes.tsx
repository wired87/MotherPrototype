// ALL SCOPES: https://developers.google.com/identity/protocols/oauth2/scopes

export const youTubeScopes: string[] = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.channel-memberships.creator",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtubepartner",
  "https://www.googleapis.com/auth/youtubepartner-channel-audit",
]

export const portabilityReset: string[] =[
  "POST https://dataportability.googleapis.com/v1/authorization:reset"
]

export const portabilityScopes: string[] = [
  "https://www.googleapis.com/auth/dataportability.businessmessaging.conversations",

  "https://www.googleapis.com/auth/dataportability.chrome.autofill",
  "https://www.googleapis.com/auth/dataportability.chrome.bookmarks",
  "https://www.googleapis.com/auth/dataportability.chrome.dictionary",
  "https://www.googleapis.com/auth/dataportability.chrome.extensions",
  "https://www.googleapis.com/auth/dataportability.chrome.history",
  "https://www.googleapis.com/auth/dataportability.chrome.reading_list",
  "https://www.googleapis.com/auth/dataportability.chrome.settings",

  "https://www.googleapis.com/auth/dataportability.maps.commute_routes",
  "https://www.googleapis.com/auth/dataportability.maps.commute_settings",
  "https://www.googleapis.com/auth/dataportability.maps.ev_profile",
  "https://www.googleapis.com/auth/dataportability.maps.offering_contributions",
  "https://www.googleapis.com/auth/dataportability.maps.photos_videos",
  "https://www.googleapis.com/auth/dataportability.maps.reviews",
  "https://www.googleapis.com/auth/dataportability.maps.starred_places",

  "https://www.googleapis.com/auth/dataportability.myactivity.maps",
  "https://www.googleapis.com/auth/dataportability.myactivity.search",
  "https://www.googleapis.com/auth/dataportability.myactivity.shopping",
  "https://www.googleapis.com/auth/dataportability.myactivity.youtube",

  "https://www.googleapis.com/auth/dataportability.saved.collections",

  "https://www.googleapis.com/auth/dataportability.shopping.addresses",
  "https://www.googleapis.com/auth/dataportability.shopping.reviews",

  "https://www.googleapis.com/auth/dataportability.youtube.channel",
  "https://www.googleapis.com/auth/dataportability.youtube.comments",
  "https://www.googleapis.com/auth/dataportability.youtube.live_chat",
  "https://www.googleapis.com/auth/dataportability.youtube.music",
  "https://www.googleapis.com/auth/dataportability.youtube.playable",
  "https://www.googleapis.com/auth/dataportability.youtube.posts",
  "https://www.googleapis.com/auth/dataportability.youtube.private_playlists",
  "https://www.googleapis.com/auth/dataportability.youtube.private_videos",
  "https://www.googleapis.com/auth/dataportability.youtube.public_playlists",
  "https://www.googleapis.com/auth/dataportability.youtube.public_videos",
  "https://www.googleapis.com/auth/dataportability.youtube.shopping",
  "https://www.googleapis.com/auth/dataportability.youtube.subscriptions",
  "https://www.googleapis.com/auth/dataportability.youtube.unlisted_playlists",
  "https://www.googleapis.com/auth/dataportability.youtube.unlisted_videos",
]


/*

Push to production?
Your app will be available to any user with a Google Account.

You've configured your app in a way that requires verification . To complete verification, you will need to provide:

An official link to your app's Privacy Policy
A YouTube video showing how you plan to use the Google user data you get from scopes
A written explanation telling Google why you need access to sensitive and/or restricted user data
All your domains verified in Google Search Console
 */