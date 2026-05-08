// components/dashboard/earnings/SecurityBanner.tsx
import { MdSecurity } from "react-icons/md";

export default function SecurityBanner() {
  return (
    <div className="mt-12 p-8 rounded-xl bg-gradient-to-br from-surface-container to-surface-container-high flex flex-col md:flex-row items-center justify-between border border-white/5">
      <div className="flex items-center mb-6 md:mb-0">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-6">
          <MdSecurity className="text-primary text-2xl" />
        </div>
        <div>
          <h4 className="text-on-surface font-bold text-lg leading-tight">
            Secure Settlement Layer
          </h4>
          <p className="text-on-surface-variant text-sm max-w-md">
            Your earnings are protected by 128-bit hardware-level encryption and
            decentralized escrow before being cleared for withdrawal.
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        <img
          className="h-10 opacity-40 grayscale hover:grayscale-0 transition-all cursor-help"
          alt="Secure network circuitry"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa2Z16VpjnNT00LCe9g59Vg3pbJh1p3b608xMjRJMIl90Ee25wG3_GXWBB1Am53PrxioHPui8uLms45HyAkX13cuCpyqm1qyxEoTo4DsTESxcinwdnRzRC4KVTuZQNO0v3PuavK6jhX5mRf7Veqe1pMfSEXYuUF7lgEgOoPORxNaP-xEUbuwhvpkZJ-bsEvEWjKoJPloDKPx-ptQ77wSL992AzI_PRS1UCf2Tt1ArmmDZfSknTuAZE4r5rwk5QwMauMjWLlizjoA"
        />
        <img
          className="h-10 opacity-40 grayscale hover:grayscale-0 transition-all cursor-help"
          alt="3D interconnected rings"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqNG863ct0pSUicEHYTrUJXH1MHhyHARMaFmI0LNdx573yDwVyfgBuj822LlugvtdFdzCDEyr20kHq8Wwv-GDIme4IFJBp49NyqzNFf0IpMvBY4_cbGHuP_mLd4cifS0PqLV5UfS43L1j_SowRX8hBvvaKnysCq8Rtzo7FqPYB-GLUtsuxvpFBfSUCByqCcStpkcQ7CG89e9MvHWKjSm9zVUCfLVNFk-6Z0nnHwWgJaAK934PeL_4-6LkfE5pyavRVjMfL_YkOkQ"
        />
      </div>
    </div>
  );
}
