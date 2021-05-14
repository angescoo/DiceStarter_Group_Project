import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {sendFormAsync} from '../../app/actions/formActions/index';
import {
  getCategoriesAsync,
} from '../../app/actions/handleProductsActions/index';
import './formCreateProduct.css';

import Select from 'react-select';
import {
  formData,
  formInputData,
  formTextAreaData,
  Inputs,
  errorsInput,
  Categories,
} from '../../types';
import ColorCircle from '../colorCircle/ColorCircle';
import {productCategories} from '../../app/reducers/handleProductsReducer';

function deepEqualError(a: errorsInput) {
  return JSON.stringify(a) === JSON.stringify({
    name: '',
    price: '',
    categories: '',
    color: '',
    size: '',
    stock: '',
    description: '',
    picture: '',
  });
};

function validate(input: Inputs) {
  const errors : errorsInput = {
    name: '',
    price: '',
    categories: '',
    color: '',
    size: '',
    stock: '',
    description: '',
    picture: '',
  };
  if (!input.name) {
    errors.name = 'Name is required';
  }

  if (!input.price) {
    errors.price = 'Price is required';
  }

  if (!input.categories.length) {
    errors.categories = 'categories are required';
  };

  if (!input.color.length) {
    errors.color = 'colors are required';
  }

  if (input.size === '0') {
    errors.size = 'size is required';
  }

  if (!input.stock) {
    errors.stock = 'stock is required';
  }

  if (!input.description) {
    errors.description = 'description is required';
  }

  if (!input.picture.length) {
    errors.picture = 'picture is required';
  }
  return errors;
};

const FormCreateProduct = () => {
  const dispatch = useAppDispatch();
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [redirect]);
  const productCats = useAppSelector(productCategories);
  const [color, setColor] = useState('');
  const [errors, setErrors] = useState<errorsInput>({
    name: '',
    price: '',
    categories: '',
    color: '',
    size: '',
    stock: '',
    description: '',
    picture: '',
  });
  const [input, setInput] =
    useState<Inputs>({
      name: '',
      price: '0',
      categories: [],
      color: [],
      size: '0',
      stock: 0,
      description: '',
      picture: [],
      available: true,
    });
  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleSubmit = (e: formData) => {
    e.preventDefault();
    if (deepEqualError(errors)) {
      alert('Succesfully created!');
      dispatch(sendFormAsync(input));
      setInput({
        name: '',
        price: '0',
        categories: [],
        color: [],
        size: '0',
        stock: 0,
        description: '',
        picture: [],
        available: true,
      });
      setRedirect(true);
    } else {
      alert('Complete the requires spaces!');
    }
  };
  const handleChange = (e: formInputData) => {
    let data: string | number = e.target.value;
    if (e.target.name === 'rating' ||
    e.target.name === 'stock') {
      data = parseFloat(data);
    }
    setInput({...input, [e.target.name]: data});
  };

  const addColor = (color: string) => {
    const repColor = input.color.find((el: string) => el === color);
    if (!repColor) {
      const newcolor = [...input.color, color];
      setInput({...input, color: newcolor});
    }
  };
  const handleTextAreaChange = (e: formTextAreaData) => {
    setInput({...input, [e.target.name]: e.target.value});
  };
  const handleSelectChange = (e: any) : void => {
    const data = e.map((el: Categories) => {
      return el.value;
    });
    setInput({...input, categories: data});
  };
  const handlePictureChange = (e: any): void => {
    const data = e.map((el: Categories) => {
      return el.value;
    });
    setInput({...input, picture: data});
  };
  return (
    <div className='formCreateProductGrid'>
      {
        redirect === true && <Redirect to={`/home`}></Redirect>
      }
      <form className='formCreateProductForm' onSubmit={handleSubmit}>
        <div className='formCreateProductUrlPicture'>
          <label className='formCreateProductLabel'
            htmlFor="">URL picture</label>
          <Select
            className='formCreateProductInput'
            isMulti
            name="picture"
            options={[{value: 'http://mathartfun.com/shopsite_sc/store/html/Bd100.jpg', label: 'foto 1'}]}
            onChange={handlePictureChange}
          >
          </Select>
          <p className='formCreateProductError'>{errors.picture}</p>
        </div>
        <div className='formCreateProductName'>
          <label className='formCreateProductLabel'
            htmlFor="">name</label>
          <input
            className='formCreateProductInput'
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.name}</p>
        </div>
        <div className='formCreateProductPrice'>
          <label className='formCreateProductLabel'
            htmlFor="">price
          </label>
          <input
            className='formCreateProductInput'
            type="number"
            value={input.price}
            step="0.1"
            name = "price"
            min="0"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.price}</p>
        </div>
        <div className='formCreateProductStock'>
          <label className='formCreateProductLabel'
            htmlFor="">stock
          </label>
          <input
            className='formCreateProductInput'
            type="number"
            value={input.stock}
            name = "stock"
            min="0"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.stock}</p>
        </div>
        <div className='formCreateProductSize'>
          <label className='formCreateProductLabel'
            htmlFor="">size
          </label>
          <input
            className='formCreateProductInput'
            type="number"
            value={input.size}
            name = "size"
            min="0"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.size}</p>
        </div>
        <div className='formCreateProductColor'>
          <label className='formCreateProductLabel'
            htmlFor="">color
          </label>
          <div className='formCreateProductColorBalls'>
            {input.color.length ?
              input.color.map((el) => <ColorCircle key={el} color={el}
                onClick={() => {
                  const toChange = input.color.filter((color) => el !== color);
                  setInput({...input, color: toChange});
                }}/>) :
            null}
          </div>
          <input
            className='formCreateProductInput'
            type="color"
            value={input.color}
            name = "color"
            onChange={(e)=> setColor(e.target.value)}
          />
          <input className='formCreateProductColorButton'
            type="button"
            value="add color"
            onClick={() => addColor(color)} />
          <p className='formCreateProductError'>{errors.color}</p>
        </div>
        <div className='formCreateProductDescription'>
          <label className='formCreateProductLabel'
            htmlFor="">description
          </label>
          <textarea className='formCreateProductDescriptionTextArea'
            value={input.description}
            name = "description"
            onChange={handleTextAreaChange}
          >
          </textarea>
          <p className='formCreateProductError'>{errors.description}</p>
        </div>
        <div className='formCreateProductSelector'>
          <Select
            className='formCreateProductInput'
            isMulti
            name="categories"
            options={productCats}
            onChange={handleSelectChange}
          >
          </Select>
          <p className='formCreateProductError'>{errors.categories}</p>
        </div>
        <input
          className='formCreateProductButtonCreate'
          type="submit"
          value="Create"
        />
      </form>
    </div>
  );
};

export default FormCreateProduct;
