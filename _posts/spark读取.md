1. 使用pyspark读取一个文件夹

   - spark将按照指定的格式读取这个文件夹下的全部文件(不会读取其中的文件夹)
   - 命名没有要求
   - 如果读取csv等特定格式的文件，文件内的结构组成要统一

   

2. hdfs用户的问题

   - user是可以通过`os.environ["HADOOP_USER_NAME"`来修改的，但是必须在生成一个spark之前，也就是`start spark之前`
   - hdfs的认证分为2种
     - simple(默认的模式)
       - 其实就是没有认证，默认通过系统防火墙进来的访问就是安全的
       - 仅仅检查访问的用户对文件系统下的各种权限
     - Kerberos(这好像是企业一般会采用的方式，而且我们可以直接用cloudera进行管理)
       - 需要开启Kerberos认证方式，refer [CLouder Manager 集成 Kerberos](https://blog.csdn.net/u011026329/article/details/79167884)
       - 

   

3. 创建HDFS资源

   1. 名称

      - 类似创建mysql

   2. 类型：

      - HDFS

   3. host：

      - 也就是NameNode的ip

   4. port：

      - NameNode的RPC交互端口，默认为8020

      - ###### web管理端口作（默认50070）作为未来的的选择

   5. user：

      - 操作指定操作hdfs的用户