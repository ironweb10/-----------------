import * as SDP from 'sdp';
export interface IntermediateMediaDescription {
    direction: SDP.SDPDirection;
    kind: string;
    protocol: string;
    mid: string;
    iceParameters?: SDP.SDPIceParameters;
    dtlsParameters?: SDP.SDPDtlsParameters;
    setup?: string;
    rtpParameters?: SDP.SDPRtpCapabilities;
    rtpEncodingParameters?: SDP.SDPEncodingParameters[];
    rtcpParameters?: SDP.SDPRtcpParameters;
    streams?: SDP.SDPMediaStreamId[];
    candidates?: SDP.SDPIceCandidate[];
    sctp?: SDP.SDPSctpDescription;
}
export interface IntermediateSessionDescription {
    sessionId?: string;
    sessionVersion?: number;
    iceLite?: boolean;
    media: IntermediateMediaDescription[];
    groups: SDP.SDPGroup[];
}
export declare type IntermediateCandidate = SDP.SDPIceCandidate;
export declare function importFromSDP(sdp: SDP.SDPBlob): IntermediateSessionDescription;
export declare function exportToSDP(session: IntermediateSessionDescription): string;
