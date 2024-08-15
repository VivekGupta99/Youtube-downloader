import style from "./ResultSection.module.css"

const ResultSection = (props) => {
  const title = props.result.title.slice(0, 60) + " ...."
  const thumb = props.result.thumb

  return (
    <div className={style["result-div"]}>
      <div className={style["thumb-div"]}>
        <img src={thumb} alt="thumb"></img>
      </div>
      <div className={style["result-details"]}>
        <h3>{title}</h3>
        <div className={style["download-section"]}>
          <table>
            <thead>
              <tr>
                <th>Quality</th>
                <th>Size</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {props.result.urls.map((url, index) => (
                <tr key={index}>
                  <td>{url.quality}</td>
                  <td>{url.size} MB</td>
                  <td>
                    <a href={url.url} target="_blank" rel="noreferrer">
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ResultSection
