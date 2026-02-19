import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast';
import { useWallet } from '../context/WalletContext';

export default function Receive() {
  const navigate = useNavigate();
  const { account } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = useCallback(() => {
    if (!account) return;
    navigator.clipboard.writeText(account);
    setCopied(true);
    toast.success('Address copied');
    setTimeout(() => setCopied(false), 2000);
  }, [account]);

  const downloadQR = useCallback(() => {
    const wrap = document.getElementById('receive-qr-wrap');
    const svg = wrap?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'decentropay-address.png';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  }, []);

  if (!account) {
    return (
      <div className="page">
        <div className="connect-gate">
          <div className="connect-gate-card">
            <h2>Connect your wallet</h2>
            <p>Connect MetaMask to get your receive address and QR code.</p>
            <button type="button" className="btn-primary" onClick={() => navigate('/')}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="receive-page">
        <div className="receive-card">
          <div className="receive-qr-wrap" id="receive-qr-wrap">
            <QRCodeSVG
              value={account}
              size={220}
              level="H"
              includeMargin={false}
            />
          </div>
          <div className="receive-address">{account}</div>
          <div className="receive-buttons">
            <button type="button" className="btn-primary" onClick={copyAddress}>
              Copy
            </button>
            <button type="button" className="btn-ghost" onClick={downloadQR}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
