import { HttpHeaders } from '@angular/common/http';

export const NO_LOADER = 'X-Loader';
export const NO_LOADER_HEADER = new HttpHeaders({ [NO_LOADER]: 'no-loader' });

export const PING_POLL_STATUS_INTERVAL = 1000;
