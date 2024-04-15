PGDMP      ;                |         
   restaurant    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
       public         heap    postgres    false            �            1259    16483    orders    TABLE     �   CREATE TABLE public.orders (
    id text NOT NULL,
    customers_id text NOT NULL,
    date text NOT NULL,
    status text NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �          0    16474 	   customers 
   TABLE DATA           A   COPY public.customers (id, name, username, password) FROM stdin;
    public          postgres    false    216   �       �          0    16467 
   menu_items 
   TABLE DATA           B   COPY public.menu_items (id, name, description, price) FROM stdin;
    public          postgres    false    215   =       �          0    16483    orders 
   TABLE DATA           @   COPY public.orders (id, customers_id, date, status) FROM stdin;
    public          postgres    false    217   v       \           2606    16480    customers customers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    216            ^           2606    16482     customers customers_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_username_key;
       public            postgres    false    216            X           2606    16473    menu_items menu-items_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT "menu-items_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.menu_items DROP CONSTRAINT "menu-items_pkey";
       public            postgres    false    215            Z           2606    16496    menu_items menu_items_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.menu_items DROP CONSTRAINT menu_items_name_key;
       public            postgres    false    215            `           2606    16489    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    217            a           2606    16490    orders orders_customers_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customers_id_fkey FOREIGN KEY (customers_id) REFERENCES public.customers(id);
 I   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_customers_id_fkey;
       public          postgres    false    217    4700    216            �   G   x�3u�4�pqt6q2�0100�pq1r6u320�4p��0�t��MT)�L*M�KT(-)J�L��	�=... U"      �   )  x�m����6���S��)HG	P%�Mm�L�Kd[5Q��٧O�dOeN�t����Q%5u߳F֒iƤ����d�����
ǓMɑ��/��f�э��������9�d�O�N��qGƓ���e�-�#�Ld?��FV��6<}���%e�E]��3-z�W���4���I�C����/(^L.9d�ɟV?cir�$�/�6��ϐ<�p���<Ý.3�E�=D7#R��$h=�Jktƴ\Q���-e���\����7z<��eu��^��r8|���6�p���v$�p��;Cp���X�]9Y��B�t/� ��6�k)����7�����B�3�Pq+��L���,v�:�9a��)�G8�߆��A�*�[�j%5�Ui�ھ�zoa��2�n�D�h�����_���_���4[��������6�|\q�$�ԙ������`�ӪmU]��4\Ӟ�Ek�cx��������,�������j�ϗ�x��rE�#`��-N��m�aL��f�Ave�h�E�h��W�x�߂M6���j�w"�2zL��-zxñ ���-G,"0���ѽǤ�~�@V�s���f4�յ)���N��R��d�J��^b�.q̣Ƶ�8)��A�>�hr��ã�n�����N=M6��5����amU��V�P��m�-�)�3���Z�n!���3�=�r�G�`����w[�6q�z��s!o��J�R7�R�xń�j)�4J����_?+���y(^�f����xI�Mm��q���C�ܶh۬K<�ϨZ�2������?,���      �   e   x��1�0��~E^ ��m|��Ϣ�t(�Ҁ�/%SO�V�7WzS3�*#�F�gq��V����@�1Ĺ
J��i���9�d�X��}��uߟ��)����     