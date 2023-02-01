import Image from 'next/image'
import {useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {sanityClient, urlFor} from "../../../sanity";
import { useBasket } from '../../../src/context/BasketContext';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SlugProduct({productData}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [expanded, setExpanded] = useState({one: false, two: false});
    const [selectedSize, setSelectedSize] = useState({name: "", materials: []});
    const [colors, setColors] = useState([]);
    const { basket, dispatch } = useBasket();
    const product = productData[0].product;
    const sizes = product.sizes;
    const handleOnChangeSelect = (selected: any) => {
        const colors = selected.materials;
        setSelectedSize(selected)
        setColors(colors)
    }

    return (
        <div className='w-full overflow-x-hidden dark:bg-neutral-800'>
            <div
                className='min-h-screen max-w-[75rem] mx-auto px-10 sm:px-12 py-20 grid grid-cols-1 sm:grid-cols-3 sm:gap-6'>
                <div id='left-pane' className='mb-10'>
                    <div id='image-wrapper'>
                        <Image className='w-full' width={539} height={885} src={urlFor(product?.src).url()}
                               alt={product?.name}/>
                    </div>
                </div>
                <div id='right-pane' className='col-span-2'>
                    <h1 style={{fontFamily: 'Helvetica'}}
                        className='text-3xl font-medium sm:text-left dark:text-white'>{product?.name}</h1>
                    <p className='mt-1'>{}</p>
                    <p className='mt-5 dark:text-white'>XAF {product?.price}</p>
                    {/* <!-- Sizes --> */}
                    <div className="mt-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Size</h3>
                            <a href="pages/category/Product[slug]#[slugProduct].tsx"
                               className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Size guide
                            </a>
                        </div>
                        <RadioGroup value={selectedSize} onChange={(selected) => handleOnChangeSelect(selected)}
                                    className="mt-4">
                            <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                            <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                {sizes.map((size: any) => (
                                    <RadioGroup.Option
                                        key={size.name}
                                        value={size}
                                        disabled={!size.materials}
                                        className={({active}) =>
                                            classNames(
                                                size.materials
                                                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                active ? 'ring-2 ring-slate-700' : '',
                                                'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                            )
                                        }
                                    >
                                        {({active, checked}) => (
                                            <>
                                                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                {size.materials ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'border' : 'border-2',
                                                            checked ? 'border-slate-700' : 'border-transparent',
                                                            'pointer-events-none absolute -inset-px rounded-md'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                    >
                                                        <svg
                                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                            viewBox="0 0 100 100"
                                                            preserveAspectRatio="none"
                                                            stroke="currentColor"
                                                        >
                                                            <line x1={0} y1={100} x2={100} y2={0}
                                                                  vectorEffect="non-scaling-stroke"/>
                                                        </svg>
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                        <RadioGroup>
                            <div className={"mt-5 flex"}>
                                {colors.map((color: any) => (
                                    <RadioGroup.Option key={color.color}
                                                       value={color}
                                                       className={({active, checked}) =>
                                                           classNames('cursor-pointer py-3 px-4 mr-4 w-8 h-8 shadow-sm rounded-md',
                                                               active || checked ? 'border-2 border-gray-500' : '',
                                                           )
                                                       }
                                                       style={{background: color.color}}>
                                    </RadioGroup.Option>
                                ))
                                }
                            </div>
                        </RadioGroup>
                    </div>

                    <p className='mt-6 text-slate-400'>
                        *Those tee are made on-demand, after placing your order we will send you an e-mail for further
                        information
                    </p>
                    <div className='mt-4 flex'>
                        <button className='bg-gradient-to-bl from-slate-700 to-slate-900 px-8 py-4 text-white font-space'
                            onClick={() => {
                                dispatch({
                                    type: "ADD_PRODUCT", payload: {
                                        sku: product?.sku,
                                        qty: 1,
                                        price: product?.price,
                                        size: selectedSize.name,
                                        color: 'black'
                                    }
                                })
                            }
                            }
                        >Add to basket</button>
                        <button className='border-slate-700 border-2 px-8 py-4 font-space ml-5'>Favorite</button>
                    </div>
                    <p className='mt-12'>

                    </p>
                    <div className='mt-12'>
                        <ul className='list-disc ml-4'>
                            <li>Shown: Black</li>
                            <li>{"Brand (Blank tee): Sol's"}</li>
                        </ul>
                    </div>
                    {/* Divider */}
                    <div className='h-[0.05rem] bg-slate-300 my-6'></div>

                    <div id='submenu-wrapper'>
                        <div id="submenu">
                            <div className='submenu-title flex items-center justify-between cursor-pointer'
                                 onClick={() => {
                                     setExpanded({...expanded, one: !expanded.one})
                                 }}>
                                <h3 className='text-xl'>Size & Fit</h3>
                                <span className='text-2xl'>+</span>
                            </div>
                            <ul className={`list-disc mt-4 ml-4 ${!expanded.one && 'hidden'}`}>
                                <li>{"model? is wearing size M and is 6'1/185cm"}</li>
                                <li>Big & regular model? is wearing size 2XL and is 175cm</li>
                                <li>Standard fit has a relaxed, easy feel</li>
                            </ul>
                        </div>

                        {/* Divider */}
                        <div className='h-[0.05rem] bg-slate-300 my-6'></div>

                        <div id="submenu">
                            <div className='submenu-title flex items-center justify-between cursor-pointer'
                                 onClick={() => {
                                     setExpanded({...expanded, two: !expanded.two})
                                 }}>
                                <h3 className='text-xl'>Free Shipping & Returns</h3>
                                <span className='text-2xl'>+</span>
                            </div>
                            <p className={`mt-4 ${!expanded.two && 'hidden'}`}>Free standard shipping and free return
                                for Douala V dwellers.</p>
                        </div>

                        {/* Divider */}
                        <div className='h-[0.05rem] bg-slate-300 my-6'></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const query = `*[_type == "categories" && type == $type]{
    _id,
    type,
    name,
    "product": *[_type == "products" && slug.current ==$slugProduct][0]{
      _id,
      name,
      sku,
      slug,
      src {
        asset
      },
      price,
      sizes
    }
}`;
    const productData = await sanityClient.fetch(query, {type: params?.type, slugProduct: params?.slugProduct});
    return {
        props: {
            productData
        }
    }
}
