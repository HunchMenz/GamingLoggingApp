import Image from "next/image"
import Link from 'next/link'
import brand from '/assets/derpLMAO.png'

export default function Navbar() {
    return (
        <nav class="navbar" role="navigation" aria-aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="">
                    <Image
                        src={brand}
                        alt="Temp Brand"
                    />
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item">
                        Home
                    </a>

                    <a class="navbar-item">
                        Games List
                    </a>

                    <a class="navbar-item">
                        <Link href="/testImages">
                            TestImages
                        </Link>
                        
                    </a>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider"/>
                                <a class="navbar-item">
                                    Report an issue
                                </a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-link">
                                <strong>Sign up</strong>
                            </a>
                            <a class="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}