import React from 'react';

import styled from 'styled-components';

import ContactItem from '../components/ContactItem';

const ContactPage = () => (
    <ContactContainer>
        <ContactItem />
    </ContactContainer>
);

const ContactContainer = styled.div`
    display: flex;
    justify-content: center;
    align-item: center;
`;

export default ContactPage;
