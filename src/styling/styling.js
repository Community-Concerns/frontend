import styled from "styled-components"
import banner from "../images/banner.jpg"

// Styling for sitewide header
export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    box-shadow: 3px 3px 3px black;
    position: relative;
    z-index: 9;
    .nav-title {
        font-weight: bold;
        font-size: 30px;
        font-family: "Cooper Black";
        margin-left: 50px;
    }
    nav {
        margin-right: 50px;
        .nav-link {
            margin: 0px 20px;
            padding: 10px 20px;
            font-size: 20px;
            text-decoration: none;
            color: black;
            cursor: pointer;
            &:visited {
                color: black;
            }
        }
        .active-nav {
            font-weight: bold;
        }
    }
`

export const StyledHome = styled.main`
    .main-banner {
        background: url(${banner});
        background-size: cover;
        background-position: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90vh;
        .banner-inner {
            width: 100%;
            text-align: center;
            .banner-text {
                color: white;
                text-shadow: 3px 3px 3px black;
                width: 65%;
                text-align: center;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 3%;
            }
            .banner-action {
                padding: 2% 4%;
                font-size: 20px;
                font-weight: bold;
                background: rgba(0, 0, 0, .9);
                color: white;
                text-decoration: none;
                margin-left: auto;
                margin-right: auto;
                box-shadow: 3px 3px 3px black;
                transition: all .2s;
                border: none;
                cursor: pointer;
                &:hover {
                    background: rgba(0, 0, 0, 1);
                    box-shadow: 5px 5px 5px black;
                    text-shadow: 2px 2px 3px black;
                }
            }
        }
        
    }
`

export const StyledLogin = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    .main-login-container {
        height: 50%;
        margin-left: auto;
        margin-right: auto;
        .login-box {
            border: 2px solid black;
            border-radius: 10px;
            box-shadow: 3px 3px 3px black;
            text-align: center;
            input {
                width: 90%;
                font-size: 20px;
                text-align: center;
                margin: 10px auto;
            }
        }
    }
`

export const StyledRegistration = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    .main-login-container {
        height: 50%;
        margin-left: auto;
        margin-right: auto;
        .login-box {
            border: 2px solid black;
            border-radius: 10px;
            box-shadow: 3px 3px 3px black;
            text-align: center;
            input {
                width: 90%;
                font-size: 20px;
                text-align: center;
                margin: 10px auto;
            }
        }
    }
`

export const StyledDashboard = styled.main`
    margin: 0px 5%;
    .dash-profile {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 15vh;
        .font-weight-light {
            font-weight: lighter!important;
        }
    }
    .dash-tickets-main {
        display: flex;
        justify-content: space-between;
        .tickets-container {
            width: 45%;
            border: 2px solid silver;
            border-radius: 10px;
            background-color: black;
            padding: 2%;
            box-shadow: 3px 3px 5px black;
            .dash-my-tickets-container, .dash-all-tickets-container {
                height: 54vh;
                overflow-y: auto;
            }
            h2 {
                text-align: center;
                color: white;
            }
            .single-ticket {
                background-color: silver;
                padding: 10px 10px;
                margin-bottom: 5px;
                box-shadow: inset 3px 3px 5px black;
                .ticket-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                }
                .single-ticket-footer {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 4px;
                    p, a {
                        margin: 0px;
                        padding: 0px;
                        font-weight: bold;
                        font-style: italic;
                        color: rgb(60, 60, 60);
                        text-decoration: none;
                        cursor: pointer;
                    }
                    .userUpvoted {
                        color: blue;
                    }
                }
                .ticket-title, .ticket-description {
                    margin: 0px;
                    padding: 0px;
                }
                
            }
        }
    }
`