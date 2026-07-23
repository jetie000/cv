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
  ]

  return (
    <div className="sertificates__wrapper">
      {sertificates.map((sertificate) => (
        <div key={sertificate.name} className="sertificate__card">
          <div className="sertificate__document">
            <iframe
              src={`${sertificate.src}#toolbar=0`}
              title={sertificate.name}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </div>
          <div className="sertificate__title">{sertificate.name}</div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={sertificate.src}
          >
            View
          </a>
        </div>
      ))}
    </div>
  );
}

const container = document.getElementById('sertificates-list');
const root = ReactDOM.createRoot(container);
root.render(<List />);
