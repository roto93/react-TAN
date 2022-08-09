import React from 'react'

const Links = () => {
    return (
        <div className="links" >
            <div className="container">
                <div className="links__content" >
                    {linksArray.map((item, index) => <LinkCard key={index} item={item} />)}
                </div>
            </div>
        </div>
    )
}

export default Links

const LinkCard = ({ item }) => {
    const { abbreviation: abbr, chineseTitle: title, uri, logoUri } = item

    return (
        <div className="links__card">
            <a target="_blank" href={uri} className="links__card__a" rel="noreferrer noopener">
                <div className="links__card__logoBox" >
                    <img src={logoUri} alt={abbr} className="links__card__img" />
                </div>
                <h2 className="links__card__abbr">{abbr}</h2>
                <h3 className="links__card__title">{title}</h3>
            </a>
        </div>
    )
}

const linksArray = [
    {
        title: 'Academia Sinica Institute of Astronomy and Astrophysics',
        chineseTitle: "中研院 - 天文及天文物理研究所",
        abbreviation: 'ASIAA',
        uri: 'https://www.asiaa.sinica.edu.tw',
        logoUri: 'https://www.asiaa.sinica.edu.tw/_img/_logo/logo_asiaa.png'
    },
    {
        title: 'Department of Earth Sciences, National Taiwan Normal University',
        chineseTitle: "師大地科系",
        abbreviation: 'NTNU ES',
        uri: 'https://www.es.ntnu.edu.tw',
        logoUri: 'https://i.imgur.com/9n3EGHu.jpg'
    },
    {
        title: 'The Astronomical Society of the Republic of China(Taiwan)',
        chineseTitle: "中華民國天文學會",
        abbreviation: 'ASROC',
        uri: 'http://www.asroc.org.tw',
        logoUri: 'http://www.asroc.org.tw/_img18/logo_asroc_s.png'
    },
    {
        title: 'Center of Astronomy and Gravitation',
        chineseTitle: "師大 - 天文與重力中心",
        abbreviation: 'CAG',
        uri: 'https://www.cag.ntnu.edu.tw',
        logoUri: 'https://i.imgur.com/bhoZXGF.png'
    },



]

