import NextScript from 'next/script'

export default function LeadBack() {
  return (
    <NextScript id="lead_back" strategy="afterInteractive">
      {`
            var _emv = _emv || [];
            _emv['campaign'] = '5400e6a610e6cd4777acea46';

            (function() {
                var em = document.createElement('script'); em.type = 'text/javascript'; em.async = true;
                em.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'leadback.ru/js/leadback.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(em, s);
            })();
        `}
    </NextScript>
  )
}
