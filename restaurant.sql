PGDMP                      |         
   restaurant    16.2    16.2 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397 
   restaurant    DATABASE     �   CREATE DATABASE restaurant WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE restaurant;
                postgres    false            �            1259    16474 	   customers    TABLE     �   CREATE TABLE public.customers (
    id text NOT NULL,
    name text NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    16467 
   menu_items    TABLE     �   CREATE TABLE public.menu_items (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    price numeric NOT NULL
);
    DROP TABLE public.menu_items;
       public         heap    postgres    false            V           2606    16480    customers customers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    216            X           2606    16482     customers customers_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_username_key;
       public            postgres    false    216            T           2606    16473    menu_items menu-items_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT "menu-items_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.menu_items DROP CONSTRAINT "menu-items_pkey";
       public            postgres    false    215           