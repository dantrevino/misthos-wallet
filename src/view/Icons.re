include ViewCommon;

let toBase64Encoding = icon =>
  ReactDOMServerRe.renderToStaticMarkup(icon)
  |> Node.Buffer.fromString
  |> BufferExt.toStringWithEncoding("base64");

let asDataUrl = icon =>
  "data:image/svg+xml;base64," ++ toBase64Encoding(icon);

let arrowRight =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16">
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2">
      <path d="M1 8h14M8 1l7 7-7 7" />
    </g>
  </svg>;

let arrowUpCircle =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26">
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transform="translate(1 1)">
      <circle cx="12" cy="12" r="12" />
      <path d="M12 17V7M7 12l5-5 5 5" />
    </g>
  </svg>;

let close =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20">
    <g fill="none" fillRule="evenodd">
      <path
        fill="#000"
        d="M19.333 2.533L17.467.667 10 8.133 2.533.667.667 2.533 8.133 10 .667 17.467l1.866 1.866L10 11.867l7.467 7.466 1.866-1.866L11.867 10z"
      />
      <path d="M26 26H-6V-6h32z" />
    </g>
  </svg>;

let copy =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22">
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transform="translate(1 1)">
      <rect width="13" height="13" x="7" y="7" rx="2" />
      <path d="M3 13H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </g>
  </svg>;

let logoBig =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="584"
    height="419"
    viewBox="0 0 584 419">
    <defs>
      <linearGradient
        id="a" x1="-1.816%" x2="117.054%" y1="69.515%" y2="38.068%">
        <stop offset="0%" stopColor="#59F7F0" />
        <stop offset="49.223%" stopColor="#02A2B4" />
        <stop offset="100%" stopColor="#067781" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      fillRule="nonzero"
      d="M235.397 190.474h113.805v228.21H235.397v-228.21zM410.864.014C506.19.143 584 81.797 584 182.559v236.125H472.253V182.558c0-37.751-27.529-68.653-63.268-68.653-26.714 0-48.225 16.02-58.085 41.289H232.56c-9.854-25.27-31.101-41.289-57.815-41.289-35.729 0-62.993 30.907-62.993 68.653v236.125H0V3.593h111.752v9.683C173.04-13.47 244.61.896 293.65 50.07 325.662 17.904 366.685-.02 410.864.015z"
    />
  </svg>;

let logoSolid =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="45"
    height="32"
    viewBox="0 0 45 32">
    <defs>
      <linearGradient
        id="a" x1="-1.816%" x2="117.054%" y1="69.515%" y2="38.068%">
        <stop offset="0%" stopColor="#59F7F0" />
        <stop offset="49.223%" stopColor="#02A2B4" />
        <stop offset="100%" stopColor="#067781" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      fillRule="nonzero"
      d="M41.991 30.558h8.699V48H41.99V30.558zM55.402 16c7.286.01 13.233 6.25 13.233 13.952V48h-8.54V29.953c0-2.885-2.105-5.247-4.836-5.247-2.042 0-3.686 1.224-4.44 3.155h-9.044c-.754-1.93-2.377-3.155-4.42-3.155-2.73 0-4.814 2.362-4.814 5.247V48H24V16.275h8.541v.74c4.684-2.045 10.155-.946 13.903 2.812 2.446-2.459 5.582-3.829 8.958-3.826z"
      transform="translate(-24 -16)"
    />
  </svg>;

let menu =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="16"
    viewBox="0 0 24 16">
    <g fill="none" fillRule="evenodd">
      <path d="M-4-8h32v32H-4z" />
      <path
        fill="#000"
        d="M0 16h12v-2.667H0V16zm0-6.667h24V6.667H0v2.666zM0 0v2.667h24V0H0z"
      />
    </g>
  </svg>;

let minusCircle =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26">
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transform="translate(1 1)">
      <circle cx="12" cy="12" r="12" />
      <path d="M7.2 12h9.6" />
    </g>
  </svg>;

let plusCircle =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26">
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transform="translate(1 1)">
      <circle cx="12" cy="12" r="12" />
      <path d="M12 7.2v9.6M7.2 12h9.6" />
    </g>
  </svg>;

let remove =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26">
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transform="translate(1 1)">
      <circle cx="12" cy="12" r="12" />
      <path d="M15.6 8.4l-7.2 7.2M8.4 8.4l7.2 7.2" />
    </g>
  </svg>;

let stepBg =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 44 44">
    <defs>
      <linearGradient
        id="a" x1="162.467%" x2="-41.102%" y1="29.557%" y2="66.287%">
        <stop offset="0%" stopColor="#05CFDB" />
        <stop offset="100%" stopColor="#02A2B4" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
      <circle cx="21" cy="21" r="21" stroke="#000" />
      <circle cx="21" cy="21" r="18" fill="url(#a)" />
    </g>
  </svg>;

let blockStack =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24">
    <g fill="none" fillRule="nonzero">
      <path
        fill="#270F34"
        d="M24 16.431s.006 2.502-.267 3.586c-.272 1.084-.772 1.84-1.326 2.394-.557.556-1.294 1.063-2.418 1.326-1.124.264-3.563.26-3.563.26L7.566 24s-2.502.006-3.586-.266c-1.084-.273-1.84-.773-2.395-1.327C1.03 21.851.523 21.113.26 19.99-.005 18.866 0 16.427 0 16.427V7.57s-.006-2.502.267-3.586c.272-1.084.772-1.84 1.326-2.394C2.15 1.033 2.887.526 4.011.263c1.124-.264 3.563-.26 3.563-.26L16.434 0s2.502-.006 3.586.266c1.084.273 1.84.773 2.395 1.327.556.556 1.062 1.294 1.326 2.417.264 1.124.259 3.563.259 3.563v8.858z"
      />
      <g fill="#FEFEFE">
        <path
          d="M8.12 17.832a1.956 1.956 0 1 0 0-3.911 1.956 1.956 0 0 0 0 3.911M8.12 10.035a1.956 1.956 0 1 0 0-3.912 1.956 1.956 0 0 0 0 3.912M15.943 10.035a1.956 1.956 0 1 0 0-3.912 1.956 1.956 0 0 0 0 3.912M15.943 17.832a1.956 1.956 0 1 0 0-3.912 1.956 1.956 0 0 0 0 3.912"
        />
      </g>
    </g>
  </svg>;

let misthosWordMark =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="142"
    height="31"
    viewBox="0 0 142 31">
    <defs>
      <linearGradient
        id="a" x1="-1.816%" x2="117.054%" y1="69.515%" y2="38.068%">
        <stop offset="0%" stopColor="#59F7F0" />
        <stop offset="49.223%" stopColor="#02A2B4" />
        <stop offset="100%" stopColor="#067781" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      fillRule="nonzero"
      d="M65.498 90.655a3.646 3.646 0 1 1-7.294 0 3.646 3.646 0 0 1 7.294 0zm83.55 16.575c0 5.912-4.938 10.614-11.134 10.614-6.15 0-11.087-4.702-11.087-10.614 0-5.867 4.938-10.616 11.087-10.616 6.196 0 11.134 4.749 11.134 10.616zm-5.87-.047c0-1.444-.513-2.794-1.49-3.817-1.026-1.071-2.284-1.63-3.728-1.63-1.35 0-2.701.559-3.633 1.63-1.071 1.023-1.584 2.42-1.584 3.864 0 1.489.513 2.84 1.584 3.91.932 1.024 2.283 1.583 3.633 1.583 1.444 0 2.702-.559 3.728-1.583.978-1.07 1.49-2.467 1.49-3.957zm-106.316-2.088h6.087v12.363h-6.087v-12.363zm9.518-10.4c5.192.008 9.43 4.447 9.43 9.926v12.837h-6.086v-12.837c0-2.053-1.5-3.733-3.446-3.733-1.456 0-2.627.87-3.164 2.245h-6.446c-.537-1.374-1.694-2.245-3.15-2.245-1.946 0-3.43 1.68-3.43 3.733v12.837H24V94.89h6.087v.527c3.339-1.454 7.237-.673 9.908 2 1.744-1.748 3.978-2.723 6.385-2.721zm12.564 22.754V97.661h5.663v19.788h-5.663zm11.677-6.749c2.765 3.306 6.98 3.444 6.98.964 0-1.47-1.361-1.929-2.766-2.388-3.688-1.193-6.234-2.387-6.234-6.197 0-3.628 3.117-6.015 6.717-6.015 3.249 0 5.005.734 7.55 2.341l-2.546 4.178c-3.687-2.754-6.189-2.525-6.453-.413-.219 1.47 1.844 1.745 4.04 2.525 2.677.827 5.179 2.71 5.179 6.107 0 3.168-3.116 6.198-6.98 6.198-3.424 0-6.672-1.147-8.999-3.58l3.512-3.72zm82.912 0c2.766 3.306 6.98 3.444 6.98.964 0-1.47-1.36-1.929-2.766-2.388-3.687-1.193-6.233-2.387-6.233-6.197 0-3.628 3.117-6.015 6.717-6.015 3.248 0 5.004.734 7.55 2.341l-2.546 4.178c-3.687-2.754-6.19-2.525-6.453-.413-.22 1.47 1.843 1.745 4.038 2.525 2.678.827 5.18 2.71 5.18 6.107 0 3.168-3.116 6.198-6.98 6.198-3.424 0-6.673-1.147-8.999-3.58l3.512-3.72zm-58.45-13.062h4.32v5.299h-4.32v14.521H89.39v-14.521h-3.927v-5.3h3.927V87.097h5.694v10.542zm19.083-.573c5.53 0 10.008 4.729 10.009 10.513v9.872h-5.795v-9.872a5.77 5.77 0 0 0-1.449-3.81c-.921-1.01-2.15-1.561-3.467-1.561-1.317 0-2.59.55-3.513 1.56a5.767 5.767 0 0 0-1.448 3.811v9.872h-5.839V87h5.839v11.9c1.625-1.147 3.556-1.835 5.663-1.835z"
      transform="translate(-24 -87)"
    />
  </svg>;
