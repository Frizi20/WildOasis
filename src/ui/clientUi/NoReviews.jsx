import { styled } from "styled-components"


const Container = styled.div`
    background-color: #f8f8f8;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function NoReviews() {
    return (
        <Container>
            No reviews yet
        </Container>
    )
}

