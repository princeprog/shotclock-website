// Server components render once per request, so "now" is the request time used to split upcoming games from past ones.
export const requestTime = () => Date.now()
