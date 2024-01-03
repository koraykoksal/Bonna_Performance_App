# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


DOCKER NOT : 
Docker'da bir projenin güncellenmiş kaynak dosyalarını kullanarak yeni bir image oluşturmak ve bunu çalıştırmak için izlenecek genel adımlar aşağıdaki gibidir:

Önceki Container'ı Durdurun:
Mevcut çalışan container'ı durdurmanız gerekiyor. Bu, docker stop komutu ile yapılır:


docker stop <container_id_or_name>
Önceki Container'ı Kaldırın:
Durdurulan container'ı kaldırmak için docker rm komutunu kullanın:


docker rm <container_id_or_name>
Eski Image'i Silin (isteğe bağlı):
Eğer yer kaplamasını istemiyorsanız ve image'i daha sonra kullanmayacaksanız, eski image'i docker rmi komutu ile silebilirsiniz:


docker rmi <image_id_or_name>
Eğer yeni image eski image ile aynı tag'i kullanacaksa bu adım zorunludur, aksi halde yeni bir tag ile build etmeniz gerekir.

Kaynak Dosyalarda Yapılan Güncellemeleri Uygulayın:
Projenizin kaynak dosyalarında yapılması gereken değişiklikleri yapın.

Yeni Image Oluşturun:
Güncellenmiş kaynak dosyaları ile yeni bir Docker image oluşturun. Bu, docker build komutu ile yapılır:


docker build -t <image_name>:<tag> .
Burada <image_name> yeni image için bir isim ve <tag> bir versiyon numarası ya da etikettir (örneğin: myapp:v2).

Yeni Image'i Çalıştırın:
Oluşturduğunuz yeni image'den bir container başlatın:

docker run -d --name <container_name> <image_name>:<tag>
Burada <container_name> çalıştırdığınız container için bir isimdir.
