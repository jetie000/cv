
import * as pdfjsLib from 'https://unpkg.com/pdfjs-dist/build/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist/build/pdf.worker.min.mjs';

function PdfRenderer({ src, title }) {
  const canvasRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let renderTask = null;

    const renderPdf = async () => {
      try {
        setLoading(true);
        setError(false);

        const pdfDoc = await pdfjsLib.getDocument({ url: src }).promise;
        const page = await pdfDoc.getPage(1);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');

        const dpr = Math.max(window.devicePixelRatio || 1, 1.5);
        const viewport = page.getViewport({ scale: dpr });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;

        setLoading(false);
      } catch (err) {
        console.error('Error rendering PDF:', err);
        setError(true);
        setLoading(false);
      }
    };

    renderPdf();

    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [src]);


  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {loading && <div className="pdf-loader" style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}
      {error && <div className="pdf-error" style={{ textAlign: 'center', color: 'red', padding: '20px' }}>Error loading PDF</div>}

      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: loading || error ? 'none' : 'block'
        }}
        title={title}
      />
    </div>
  );
}

function List() {
  const sertificates = [
    {
      name: 'Docker and Kubernetes: The Complete Guide',
      src: './sertificates/Docker_Kubernetes-sert.pdf'
    },
    {
      name: "NestJS: The Complete Developer's Guide",
      src: './sertificates/NestJS-sert.pdf'
    },
    {
      name: 'React Native - The Practical Guide',
      src: './sertificates/RN-sert.pdf'
    },
    {
      name: 'AWS Fundamentals',
      src: './sertificates/AWS_Fundamentals-sert.pdf'
    }
  ];

  return (
    <div className="sertificates__wrapper">
      {sertificates.map((sertificate) => (
        <div key={sertificate.name} className="sertificate__card">
          <div className="sertificate__document">
            <PdfRenderer src={sertificate.src} title={sertificate.name} />
          </div>
          <div className="sertificate__title">{sertificate.name}</div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={sertificate.src}
          >
            View PDF
          </a>
        </div>
      ))}
    </div>
  );
}

const container = document.getElementById('sertificates-list');
const root = ReactDOM.createRoot(container);
root.render(<List />);
