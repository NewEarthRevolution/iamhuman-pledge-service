// ipinfo.d.ts
declare module 'ipinfo' {
    interface IpInfoResponse {
      ip: string;
      hostname: string;
      city: string;
      region: string;
      country: string;
      loc: string;
      org: string;
      postal: string;
      timezone: string;
    }
  
    function ipinfo(ip: string, token: string, callback?: (err: Error, c: IpInfoResponse) => void): Promise<IpInfoResponse>;
  
    export = ipinfo;
  }
  