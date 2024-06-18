import NextScript from 'next/script'

export default function LiveChat() {
  return (
    <>
      {/* <NextScript src="https://embed.tawk.to/6671d4cc981b6c56477e911b/1i0maeii7" strategy="afterInteractive" /> */}

      <NextScript id="live_chat" strategy="afterInteractive">
        {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6671d4cc981b6c56477e911b/1i0maeii7';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
        `}
      </NextScript>
    </>
  )
}
