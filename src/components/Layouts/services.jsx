export const Services = (props) => {
  return (
    <div id='services' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Rabies-Related Wound Management</h2>
          <p>
          Be calm and comforting when your child, relative or friend is bitten or scratched by an animal. 
          The treatment for an animal bite will be determined by the patient's healthcare worker.
          Here are some steps that you can do to manage the wound after the incident:
          </p>
        </div>
        <div className='row'>
          {props.data
              ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-xs-12 col-md-3'>
                  {' '}
                  <img src={d.img} alt='...' className='serv-img' />
                  <div className='service-desc'>
                    <h3>{d.name}</h3>
                  </div>
                  <div className="service-text">
                  <p>{d.text}</p>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  )
}
