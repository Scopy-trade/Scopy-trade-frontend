import Image from "next/image";

const logos = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzZnfnxJhqznfZrIPpWL6CM9zN4NUbTnuMpCerzYToY6svxF015cIesH7WgOpK4CBulhezD36tuLiC7v6c7dzGZdBMgQNjCO9kqKRk0Ehfm_HN-pUFHtBY3H5UhbSd8Y4TFrS1zLY4T-50YQOvNH2EI9LeVDD2viDesMDOYDgOshjK-VDH3zwSneyFBwspHbQWGbQRNAFjsrqlHt8bqxa7GcMOtBbYXSdpuJATdubOj-d38t6L-5w6AxyOL3Ovx60Rs4xGGeiKohhPl28Nr-P-Q_lA",
    alt: "Financial partner",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8T-2hqjY8D7vOxOg5CDqZ1x1oWKwKBL2l5k-KqfB4DgQPrTxSbxzELun8qMLWPDmgd2f4nPNdiRTz_QawXrJl_u3Sxv40DrscacU129dKfvprm4PV_8Ju-xPvzT1X2IkqYTLWR8t29NynimrC4yaRHwNw_ni7ihs1VIpIEmOWWMQYmU9qQo-QnSDk7CWJgh4RQ8GG4KbRehbmrmCmIhdWyaEQicU8MLXMtNr1jOnTlhtWigz0pGK3fFs7q_5XQLORL2rTx3yLmA",
    alt: "Security certification",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEndixvPbEcOeN6hhIzafR4v1y0cNvd1JtZPxLY2ThiqUAgNWvcSwmv158zFgcBv65NeZY4w82AlXCZ8hUGYH5zZqhHwy6CG2pEXk5Xjg9_bK91JYvB5Qj3KsRUbLke1e-7nlIwEojfqfnEn166sHaF_CHMK1w7CXQSKY2rXCRojbmj7qLLK4Ur5xOkLc_YIdu4IlOYi1hj_e6Du8_tQE5bg-0cci4bDa40I7CPitJdKPw37ky-t2LJNOU6Pw2GBmNXZWDuDEZYQ",
    alt: "Institutional trading partner",
  },
];

export default function PartnerLogos() {
  return (
    <div
      className="mt-12 flex flex-wrap justify-center gap-6 transition-all duration-500"
      style={{ opacity: 0.4, filter: "grayscale(1)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.opacity = "1";
        (e.currentTarget as HTMLDivElement).style.filter = "grayscale(0)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.opacity = "0.4";
        (e.currentTarget as HTMLDivElement).style.filter = "grayscale(1)";
      }}
    >
      {logos.map((logo, i) => (
        <Image
          key={i}
          src={logo.src}
          alt={logo.alt}
          width={80}
          height={24}
          className="h-6 w-auto object-contain"
          unoptimized
        />
      ))}
    </div>
  );
}
