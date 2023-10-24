import styled from 'styled-components';

export const Heading = styled.h1`
text-align: center;
color: rgb(10,173,10);
`;

export const Content = styled.div`
overflowY: scroll;
height: 2500px;
`;

export const Button = styled.div`
{
position: fixed;
width: 100%;
left:96%;
bottom: 40px;
height: 20px;
font-size: 2.5rem;
z-index: 1;
cursor: pointer;
color: rgb(10,173,10);
margin-bottom:20px;
}
@media (max-width:600px){
    display:none!important;
}

@media (max-width:992px) {
    left:87%!important;
}

`
