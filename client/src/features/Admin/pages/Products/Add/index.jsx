import React,{useState} from 'react';
import Title from '../../../Component/Common/Title';
import './add.css'
import { Steps } from 'rsuite';
import AddProductAdmin from './AddProductAdmin';
import AddColorProduct from './AddColorProduct';
import AddSizeProduct from './AddSizeProduct';


function AddProduct(props) {

    const [step,setStep] = useState(0);

    const onChange = (nextStep) => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    }

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    const render = (step) => {

        switch(step){
          case 0:
            return (
                <AddProductAdmin
                    nextStep={() => onNext()}
                />
            )

           case 1:
            return (
                <AddColorProduct
                    nextStep={() => onNext()}
                />
            )

           case 2:
            return(
                <AddSizeProduct
                
                />
            )

          default: 
            return (<div></div>)
        }
    }

    return (
        <div className="add-products">
            <Title title="ADD PRODUCTS" title_below="Zebraa Products" />

            <div className="add-content-step">
                <Steps current={step}>
                    <Steps.Item title="Add Product" description="Description" />
                    <Steps.Item title="Add Color Product" description="Description" />
                    <Steps.Item title="Add Size Color Product" description="Description" />
                    
                </Steps>

                <hr />
                    <div>
                        {render(step)}
                    </div>
                <hr />

                {/* <button onClick={onNext} disabled={step === 3} className="btn-default btn-subscribe btn-next">Next</button> */}

            </div>
        </div>
    );
}

export default AddProduct;