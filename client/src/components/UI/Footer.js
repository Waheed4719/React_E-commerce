import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './static/Footer.css'

function Footer() {
    return (
        <div>
            <footer>
                <div><h5 >Social Networks</h5>
                <ul>
                <li><FontAwesomeIcon icon={['fab','github']} size="lg" className="mx-2"/></li>
                <li><FontAwesomeIcon   icon={['fab','facebook-square']}    size="lg" className="mx-2"/></li>
                <li><FontAwesomeIcon icon={['fab','twitter']} size="lg" className="mx-2"/></li>
                </ul></div>

                <div><h5 >Newsletter</h5>
                <ul> <li>Subscribe</li></ul>
              </div>

                <div><h5>Contact</h5>
                <ul><li><FontAwesomeIcon icon={['fas','envelope']} size="lg" className="mx-3"/> test1234@gmail.com</li>
                
                <li><FontAwesomeIcon icon={['fas','phone']} size="lg" className="mx-3"/>0123456789</li>
                
                </ul></div>

            </footer>
        </div>
    )
}

export default Footer
