import Image from "next/image";

const logos = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzZnfnxJhqznfZrIPpWL6CM9zN4NUbTnuMpCerzYToY6svxF015cIesH7WgOpK4CBulhezD36tuLiC7v6c7dzGZdBMgQNjCO9kqKRk0Ehfm_HN-pUNyINoT8KGVUzUYIYI84kR4Oc-2V_2DTLV8RaVQ6EDuIOkOzMiOLNq26mQYzfQfEnX0vf2bJ96f7tsTo9hMrXGCW2MqcYnD3allWQXWcyA1OMRg-qpbTmJeg4xs-Vftthml3QLKlP2eI-8PY46LZG48guOqg",
    alt: "Financial partner logo",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8T-2hqjY8D7vOxOg5CDqZ1x1oWKwKBL2l5k-KqfB4DgQPrTxSbxzELun8qMLWPDmgd2f4nPNdiRTz_QawXrJl_u3Sxv40DrscacU129dKfvprm4PV_8Ju-xPvzT1X2IkqYTLWR8t29NynimrC4yaRHwNw_ni7ihs1VIpIEmOWWMQYmU9qQo-QnSDk7CWJgh4RQ8GG4KbRehbmrmCmIhdWyaEQicU8MLXMtNr1jOnTlhtWigz0pGK3fFs7q_5XQLORL2rTx3yLmA",
    alt: "Security certification logo",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEndixvPbEcOeN6hhIzafR4v1y0cNvd1JtZPxLY2ThiqUAgNWvcSwmv158zFgcBv65NeZY4w82AlXCZ8hUGYH5zZqhHwy6CG2pEXk5Xjg9_bK91JYvB5Qj3KsRUbLke1e-7nlIwEojfqfnEn166sHaF_CHMK1w7CXQSKY2rXCRojbmj7qLLK4Ur5xOkLc_YIdu4IlOYi1hj_e6Du8_tQE5bg-0cci4bDa40I7CPitJdKPw37ky-t2LJNOU6Pw2GBmNXZWDuDEZYQ",
    alt: "Institutional trading partner logo",
  },
];

export default function PartnerLogos() {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
      {logos.map((logo) => (
        <div key={logo.alt} className="relative h-6 w-20">
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
