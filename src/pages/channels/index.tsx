import Message from '../../components/Message';
function Channels() {
  return (
    <div className="channels">
      <aside className="sidebar">sidebar</aside>
      <main className="channels__main">
        <div className="channels__bar">
          <span className="channels__bar__text">Front-end developers</span>
        </div>
        <div className="channels__chat">
          <Message
            message={{
              src: 'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
              name: 'Denzel Barret',
              date: 'yesterday at 2:29 AM',
              body: `Morbi eget turpis ut massa luctus cursus. Sed sit amet risus quis
              neque condimentum aliquet. Phasellus consequat et justo eu accumsan
              🙌. Proin pretium id nunc eu molestie. Nam consectetur, ligula vel
              mattis facilisis, ex mauris venenatis nulla, eget tempor enim neque
              eget massa 🤣`,
            }}
          />
          <Message
            message={{
              src: 'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
              name: 'Denzel Barret',
              date: 'yesterday at 2:29 AM',
              body: `Morbi eget turpis ut massa luctus cursus. Sed sit amet risus quis
              neque condimentum aliquet. Phasellus consequat et justo eu accumsan
              🙌. Proin pretium id nunc eu molestie. Nam consectetur, ligula vel
              mattis facilisis, ex mauris venenatis nulla, eget tempor enim neque
              eget massa 🤣`,
            }}
          />
          <Message
            message={{
              src: 'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
              name: 'Denzel Barret',
              date: 'yesterday at 2:29 AM',
              body: `Morbi eget turpis ut massa luctus cursus. Sed sit amet risus quis
              neque condimentum aliquet. Phasellus consequat et justo eu accumsan
              🙌. Proin pretium id nunc eu molestie. Nam consectetur, ligula vel
              mattis facilisis, ex mauris venenatis nulla, eget tempor enim neque
              eget massa 🤣`,
            }}
          />
        </div>
        <div className="channels__compose">compose</div>
      </main>
    </div>
  );
}

export default Channels;
