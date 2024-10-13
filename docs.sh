echo -e "\n Container from"
read cont_from
echo -e "\n Container to"
read cont_to
echo -e "\n In container path"
read cont_copy_path
mkdir "copy"
while read line
do
  docker cp $cont_from:/$line ./copy
  echo $line
done < files.txt

IFS=$'\n' #for in $() splits based on IFS
search_dir="/copy"
for entry in $(ls $search_dir)
do
  docker cp /copy/$entry $cont_to:/cont_copy_path/$entry
  echo $entry
done