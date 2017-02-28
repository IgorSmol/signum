modul.constant('API_ENDPOINT', {
  url: 'https://api.signumplace.com/backend/signumplace/',
  url_src: 'https://api.signumplace.com'
})
.constant('USER_ROLES', {
  expired: 1000,
  basic: 1001,
  standard: 1002,
  premium: 1003
})
.constant('SIGNAL_STATUS', {
  action_buy: 1000,
  action_sell: 1001
})
.constant('SIGNAL_STATUS_U', {
  live: 1000,
  live_updated: 1001,
  close: 1002
});