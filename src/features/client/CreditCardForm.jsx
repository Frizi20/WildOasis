import { css, styled } from "styled-components";
import Row from "../../ui/Row";
import { MenuItem, Select } from "@mui/material";

const Wrapper = styled.div`
    overflow: hidden;
    & .expiration-date,
    & .state,
    & .zip-code,
    & .cvv {
        width: 50%;
    }
`;

const BillingDetails = styled.div``;

const Input = styled.input.attrs({ type: "text" })`
    width: 100%;
    padding: 15px;
    border: none;
    /* border-radius: 5px; */

    ${(props) =>
        props.border &&
        css`
            ${props.border
                .split(" ")
                .map((value) => `border-${value}:1px solid gainsboro;`)
                .join("")}
        `}
`;

const H3 = styled.h3`
    font-size: 2.5rem;
    font-weight: 500;
    padding: 30px 0;
    margin-top: 5px;
`;

const CardDetails = styled.div`
    margin-bottom: 30px;
`;

export default function CreditCardForm() {
    return (
        <Wrapper>
            <CardDetails>
                <div className="card-number">
                    <Input
                        placeholder="Card number"
                        border="top left right bottom"
                        defaultValue={'374245455400126'}
                    />
                </div>
                <Row type="horizontal">
                    <div className="expiration-date">
                        <Input
                            placeholder="Expiration date"
                            border="left bottom right"
                            defaultValue={'05/2026'}
                        />
                    </div>
                    <div className="cvv">
                        <Input placeholder="CVV" border="right bottom" defaultValue={920}/>
                    </div>
                </Row>
            </CardDetails>
            <BillingDetails>
                <H3>Billing address</H3>

                <Row>
                    <div className="street-addr">
                        <Input
                            placeholder="Street address"
                            border="top left right"
                            defaultValue={'Nicolae Titulescu, nr 51-59'}
                        />
                    </div>
                    <div className="city">
                        <Input border="left right top" placeholder="City" 
                        defaultValue={'Bucuresti'}/>
                    </div>
                    <Row type="horizontal">
                        <div className="state">
                            <Input
                                placeholder="State"
                                border="left right top bottom"
                                defaultValue={'Bucuresti'}
                            />
                        </div>
                        <div className="zip-code">
                            <Input
                                placeholder="ZIP code"
                                border="left right top bottom"
                                defaultValue={90007}
                            />
                        </div>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                        <Select
                            label="Number of people"
                            sx={{ fontSize: "1.8rem" }}
                            defaultValue={'ro'}
                        >
                            <MenuItem
                                value="it"
                                sx={{ fontSize: "1.8rem" }}
                                selected={true}
                            >
                                Italy
                            </MenuItem>
                            <MenuItem value={"ro"} sx={{ fontSize: "1.8rem" }}>
                                Romania
                            </MenuItem>
                            <MenuItem value={"es"} sx={{ fontSize: "1.8rem" }}>
                                Spain
                            </MenuItem>
                            <MenuItem value={"gn"} sx={{ fontSize: "1.8rem" }}>
                                Germany
                            </MenuItem>
                        </Select>
                    </Row>
                </Row>
            </BillingDetails>
        </Wrapper>
    );
}
