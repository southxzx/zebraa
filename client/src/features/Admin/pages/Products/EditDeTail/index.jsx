import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../../Component/Common/Title';
import { Steps } from 'rsuite';
import './editdetail.css'
import productApi  from '../../../../../api/productApi';
import EditDeTailProduct from './EditDeTailProduct';
import ChooseColorEdit from './ChooseColorEdit';
import EditColorProduct from './EditColorProduct';

function EditDetail(props) {
    const {_idProduct} = useParams();

    const [step,setStep] = useState(0);
    const [colorProducts,setColorProduct] = useState([]); 

    const [colorProductDetail,setColorProductDetail] = useState({
        _id:'',
        images:[],
        avatar:'',
        color:{},
        price:'',
        product:'',
        sizeProducts:[]
    })
 
    const onChange = (nextStep) => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    }

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    const render = (step) => {

        switch(step){
          case 0:
            return (
                <EditDeTailProduct
                    _idProduct = {_idProduct}
                    nextStep={() => onNext()}
                />
            )
          
          case 1:
            return (
                <ChooseColorEdit
                    infoData={(data) => getInfoData(data)}
                    colorList = {colorProducts}
                    nextStep={() => onNext()}
                />
            )

          case 2:
            return (
                <EditColorProduct
                    colorProductDetail={colorProductDetail}
                    nextStep={() => onNext()}
                />
            )
          default: 
            return (<div></div>)
        }
    }

    useEffect(() => {
        const fetchColorProduct = async () =>{
            const response = await productApi.get(_idProduct);
            console.log(response.data.data[0].colorProducts);
            setColorProduct(response.data.data[0].colorProducts);
        }

        fetchColorProduct()
    },[])



    const getInfoData = (data) => {
        let colorDetail = colorProductDetail;
    
        for (let item in data) {
            colorDetail[item] = data[item];
        }
        
        setColorProductDetail({
          ...colorProductDetail,
          colorDetail
        })

        console.log(colorProductDetail);
    }

    return (
        <div className="edit_detail_product">
            <Title title="EDIT DETAIL PRODUCTS" title_below="Zebraa Products" />
            
            <div className="add-content-step">
                <Steps current={step}>
                    <Steps.Item title="Edit Detail Product" description="Description" />
                    <Steps.Item title="Choose Color Edit Product" description="Description" />
                    <Steps.Item title="Edit Color Product" description="Description" />
                    <Steps.Item title="Edit Size Product" description="Description" />
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

export default EditDetail;